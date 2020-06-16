import React, { useRef, useEffect } from "react";
import styles from "./bouncing-ball-canvas.module.css";

const BouncingBallCanvas: React.FC = (props) => {
  const canvas = useRef(null);

  useEffect(() => {
    (function () {
      "use strict";
      window.addEventListener("load", function () {
        if (!canvas || !canvas.current.getContext) {
          return false;
        }

        /********************
          Random Number
        ********************/

        function rand(min, max): number {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /********************
          const
        ********************/

        // canvas
        const ctx = canvas.current.getContext("2d");
        let X = (canvas.current.width = window.innerWidth);
        let Y = (canvas.current.height = window.innerHeight);
        let mouseX = X / 2;
        let mouseY = Y / 2;
        let blooms = [];
        const bloomNum = 100;
        const jointNum = 8 + 2;
        let minRadius = 100;
        let maxRadius = 130;
        const flg = true;

        if (X < 768) {
          minRadius = 70;
          maxRadius = 100;
        }

        /********************
          Animation
        ********************/

        if (window) {
          window.requestAnimationFrame =
            window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        }

        /********************
          Bloom
        ********************/

        function Bloom(ctx, x, y, i): void {
          this.ctx = ctx;
          this.init(x, y, i);
        }

        Bloom.prototype.init = function (x, y, i): void {
          this.x = x;
          this.y = y;
          this.i = i;
          this.r = rand(2, 12);
          this.a = 0;
          this.rad = (this.a * Math.PI) / 180;
          this.radius = rand(minRadius, maxRadius);
          this.joints = this.getJoints();
          this.c = {
            r: rand(0, 255),
            g: rand(0, 255),
            b: rand(0, 255),
          };
        };

        Bloom.prototype.getJoints = function () {
          const joints = [];
          for (let i = 1; i < jointNum; i++) {
            const a = rand(0, 360);
            const rad = (a * Math.PI) / 180;
            joints.push(rad);
          }
          return joints;
        };

        Bloom.prototype.draw = function () {
          const ctx = this.ctx;
          ctx.save();
          ctx.fillStyle =
            "rgb(" + this.c.r + ", " + this.c.g + ", " + this.c.b + ")";
          ctx.strokeStyle =
            "rgb(" + this.c.r + ", " + this.c.g + ", " + this.c.b + ")";
          ctx.globalCompositeOperation = "lighter";
          let preX = this.x;
          let preY = this.y;
          for (let i = 1; i < jointNum; i++) {
            const x = (Math.cos(this.joints[i] * i) * this.radius) / i + preX;
            const y = (Math.sin(this.joints[i] * i) * this.radius) / i + preY;
            ctx.beginPath();
            ctx.arc(x, y, this.r, 0, Math.PI * 2, false);
            ctx.fill();
            if (flg === true && i !== 1) {
              ctx.beginPath();
              ctx.moveTo(preX, preY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
            preX = x;
            preY = y;
          }
          ctx.restore();
        };

        Bloom.prototype.updateParams = function (): void {
          for (let i = 1; i < this.joints.length; i++) {
            if (i % 2 === 0) {
              this.joints[i] += 0.005;
            } else {
              this.joints[i] -= 0.005;
            }
          }
        };

        Bloom.prototype.render = function (): void {
          this.updateParams();
          this.draw();
        };

        for (let i = 0; i < bloomNum; i++) {
          const bloom = new Bloom(ctx, X / 2, Y / 2, i);
          blooms.push(bloom);
        }

        /********************
          Render
        ********************/

        function render(): void {
          ctx.clearRect(0, 0, X, Y);
          for (let i = 0; i < blooms.length; i++) {
            blooms[i].render(i);
          }
          requestAnimationFrame(render);
        }

        render();

        /********************
          Event
        ********************/

        function onResize(): void {
          X = canvas.current.width = window.innerWidth;
          Y = canvas.current.height = window.innerHeight;
          if (X < 768) {
            minRadius = 70;
            maxRadius = 100;
          } else {
            minRadius = 100;
            maxRadius = 130;
          }
          blooms = [];
          for (let i = 0; i < bloomNum; i++) {
            const bloom = new Bloom(ctx, X / 2, Y / 2, i);
            blooms.push(bloom);
          }
        }

        window.addEventListener("resize", function () {
          onResize();
        });

        canvas.current.addEventListener("mousemove", function (e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        canvas.current.addEventListener("wheel", function (e) {
          const scrollY = e.deltaY;
          if (scrollY < 0) {
            blooms.pop();
          }
          if (scrollY > 0) {
            const bloom = new Bloom(ctx, X / 2, Y / 2, 100);
            blooms.push(bloom);
          }
        });

        let touchStartY;
        let touchMoveY;
        let touchEndY;

        canvas.current.addEventListener(
          "touchstart",
          function (e) {
            const touch = e.targetTouches[0];
            touchStartY = touch.pageY;
          },
          false
        );
        canvas.current.addEventListener(
          "touchmove",
          function (e) {
            const touch = e.targetTouches[0];
            touchMoveY = touch.pageY;
            touchEndY = touchStartY - touchMoveY;
            if (touchEndY > 0) {
              for (let i = 0; i < Math.abs(touchEndY / 1000); i++) {
                const bloom = new Bloom(ctx, X / 2, Y / 2, i);
                blooms.push(bloom);
              }
            }
            if (touchEndY < 0) {
              for (let i = 0; i < Math.abs(touchEndY / 1000); i++) {
                blooms.pop();
              }
            }
          },
          false
        );
        canvas.current.addEventListener(
          "touchend",
          function (e) {
            touchStartY = null;
            touchMoveY = null;
            touchEndY = null;
          },
          false
        );
      });
    })();
  }, []);
  return (
    <div>
      <canvas ref={canvas} className={styles.canvas}></canvas>
    </div>
  );
};

export default BouncingBallCanvas;
