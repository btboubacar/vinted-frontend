import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 1000;

// Copy of TwoThumbs with `draggableTrack` prop added
const PriceSlider = ({ rtl, values, setValues }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        draggableTrack
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "10px",
              display: "flex",
              width: "200px",
              marginTop: "13px",

              //   backgroundColor: "#2CB1BA",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#2CB1BA", "#2CB1BA", "#2CB1BA"],
                  //   colors: ["red", "red", "red"],
                  // colors: ["#ccc", "#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "28px",
              borderRadius: "2px",
              backgroundColor: "#2CB1BA",
              color: " white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
              marginTop: "-5px",
              fontSize: "10px",
            }}
          >
            <div
              style={{
                // height: "16px",
                // width: "5px",
                // textAlign: "center",
                // backgroundColor: "red",
                // padding: "5px",
                // backgroundColor: isDragged ? "#548BF4" : "#CCC",
                backgroundColor: "red",
              }}
            />
            {`${values[index]}€`}
          </div>
        )}
      />
      <output style={{ marginTop: "30px" }} id="output">
        {/* {values[0].toFixed(1)} - {values[1].toFixed(1)} */}
      </output>
    </div>
  );
};

export default PriceSlider;
