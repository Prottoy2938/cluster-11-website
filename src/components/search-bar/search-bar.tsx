import React, { useState, useEffect, useRef } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { v4 as uuid } from "uuid";
import Router from "next/router";
import dompurify from "dompurify";
import algoliasearch from "algoliasearch";
import { Hits, Props } from "./search-bar.model";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./search-bar.module.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_SEARCH_ID,
  process.env.NEXT_PUBLIC_SEARCH_KEY
);
const index = searchClient.initIndex("application-name");
const SearchBar: React.FC<Props> = (props: Props) => {
  const [hits, setHits] = useState<Hits[]>([]);
  const [cursor, setCursor] = useState(0);
  const [value, setValue] = useState(""); //initial value comes from the url query
  const [suggestionOpen, setSuggestionOpen] = useState(true);
  const [showTP, setShowTP] = useState(false);

  const cancelAsync = useRef(true);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const query = e.target.value;
    setValue(query);
    setShowTP(false);
    //getting data from algolia for rendering search suggestions
    index
      .search(query, { hitsPerPage: 10 })
      .then((result: any) => {
        if (!cancelAsync.current) return null;
        setSuggestionOpen(true);
        setHits(result.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSuggestionClick = (e: number): void => {
    const suggestionValue = document.getElementById(e.toString()).innerText;
    const href = `/webapp?app=${suggestionValue
      .toLowerCase()
      .replace(/ /g, "-")}`;
    Router.push(href);
  };

  //navigating between search suggestions and handling `Escape` and `Enter` key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < hits.length) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 38 && cursor === 0) {
      setCursor(hits.length);
    } else if (e.keyCode === 40 && cursor === hits.length) {
      setCursor(1);
    } else if (e.keyCode === 27) {
      setSuggestionOpen(false);
    }
    //Handling submit and change url based on the selected suggestion
    else if (e.keyCode === 13) {
      e.preventDefault();
      //checking if the submitted value exits in the application name list
      if (hits.length) {
        for (let i = 0; i < hits.length; i++) {
          if (hits[i].name === value) {
            const href = `/webapp?app=${value
              .toLowerCase()
              .replace(/ /g, "-")}`;
            Router.push(href);
            setSuggestionOpen(false);
            setShowTP(false);
            break;
          }
        }
      } else {
        setShowTP(true);
      }
    }
  };

  const handleFocus = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    target.select(); //selecting the entire text inside the input field
    props.setHideTitle(true);
  };
  const handleOnBlur = (): void => {
    setSuggestionOpen(false);
    setShowTP(false);
    //setting timeout for the search-container to finish transition and resize to its position.
    setTimeout(() => {
      props.setHideTitle(false);
    }, 300);
  };

  //adding suggestions value on the input(search) field when the suggestion is clicked
  useEffect(() => {
    if (document.getElementById(cursor.toString())) {
      const suggestionValue = document.getElementById(cursor.toString())
        .innerText;
      setValue(suggestionValue);
    }
  }, [cursor]);

  //reverting cursor back to 0 if the suggestions list changes/loaded
  useEffect(() => {
    setCursor(0);
  }, [hits]);

  useEffect(() => {
    //cancelling all asynchronous task before un-mounting the component
    return (): void => {
      cancelAsync.current = false;
    };
  }, []);

  //purify the data to avoid XSS attack
  const sanitizer = dompurify.sanitize;
  return (
    <div onBlur={handleOnBlur} className={styles.searchContainer}>
      <div className={styles.search}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <Tooltip
          title="No application found with that name"
          arrow={true}
          disableHoverListener={true}
          open={showTP}
          placement="bottom-start"
          classes={{
            tooltip: styles.toolTip,
            arrow: styles.toolTipArrow,
          }}
        >
          <InputBase
            spellCheck={false}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            autoComplete="off" //removing chrome autocomplete
            placeholder="Search…"
            classes={{
              root: styles.inputRoot,
              input: styles.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Tooltip>
      </div>
      <ul
        className={
          suggestionOpen && value.length !== 0 && hits.length
            ? styles.suggestionContainerOpen
            : styles.suggestionContainerClosed
        }
      >
        {suggestionOpen &&
        value.length !== 0 && //if the input field is empty, don't show suggestions
          hits.map((hit, i) => (
            <div
              className={
                cursor === i + 1 ? styles.selected : styles.notSelected
              }
              //using `onMouseDown` instead of `onClick` to avoid collusion with parent onBlur method
              onMouseDown={(): void => handleSuggestionClick(i + 1)}
              key={uuid()}
            >
              <SearchIcon className={styles.suggestionIcon} />

              <li
                className={styles.suggestionText}
                key={i}
                id={`${i + 1}`}
                data-testid={`${i + 1}`}
                value={hit._highlightResult.name.value}
                dangerouslySetInnerHTML={{
                  __html: sanitizer(hit._highlightResult.name.value),
                }}
              ></li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
