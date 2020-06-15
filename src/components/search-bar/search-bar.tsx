import IconButton from "@material-ui/core/IconButton";
import PageViewIcon from "@material-ui/icons/Pageview";
import SearchIcon from "@material-ui/icons/Search";
import algoliasearch from "algoliasearch";
import dompurify from "dompurify";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import algoliaSvg from "../../../public/algolia-logo.svg";
import { Hits, Props } from "./search-bar.model";
import styles from "./search-bar.module.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_SEARCH_ID,
  process.env.NEXT_PUBLIC_SEARCH_KEY
); //data from a next.config.js file. Get your own id from algoliaSearch.
const index = searchClient.initIndex("application-name");

const SearchBar: React.FC<Props> = (props: Props) => {
  const { applicationName } = props;
  const [hits, setHits] = useState<Hits[]>([]);
  const [cursor, setCursor] = useState(0);
  const [value, setValue] = useState(applicationName); //initial value comes from the url query
  const [suggestionOpen, setSuggestionOpen] = useState(true);
  const cancelAsync = useRef(true);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const query = e.target.value;
    setValue(query);
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
      const href = `/webapp?app=${value.toLowerCase().replace(/ /g, "-")}`;
      Router.push(href);
      setSuggestionOpen(false);
    }
  };

  const handleSearchIconClick = (): void => {
    const asPath = `/webapp?app=${value.toLowerCase().replace(/ /g, "-")}`;
    const path = `/webapp?app=${encodeURIComponent(value)}`;
    Router.push(path, asPath);
    setSuggestionOpen(false);
  };

  const handleSuggestionClick = (e: number): void => {
    const suggestionValue = document.getElementById(e.toString()).innerText;
    const href = `/webapp?app=${suggestionValue
      .toLowerCase()
      .replace(/ /g, "-")}`;
    Router.push(href);
  };

  const handleFocus = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    target.select(); //selecting the entire text inside the input field
  };
  const handleOnBlur = (): void => {
    setSuggestionOpen(false);
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
    //cancelling all asynchronous task before mounting the component
    return (): void => {
      cancelAsync.current = false;
    };
  }, []);

  //purify the data to avoid XSS attack
  const sanitizer = dompurify.sanitize;
  return (
    <div className={styles.container} onBlur={handleOnBlur}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          data-testid="search-field"
          spellCheck={false}
          className={styles.searchField}
          value={value.toLowerCase()}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          autoComplete="off" //removing chrome autocomplete
          id="search-field"
        />
        <IconButton
          className={styles.searchIconContainer}
          color="primary"
          aria-label="search"
          onClick={handleSearchIconClick}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <ul className={styles.suggestionContainer}>
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
              <PageViewIcon className={styles.searchResultIcon} />
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
        {/* showing algolia logo on the bottom of the search suggestion result*/}
        {value.length !== 0 && suggestionOpen && hits.length !== 0 && (
          <img
            src={algoliaSvg}
            alt="Search suggestions from algolia"
            className={styles.algoliaSearch}
          />
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
