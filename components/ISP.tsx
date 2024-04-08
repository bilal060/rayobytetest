import React from "react";
import CustomSelect from "@/components/CustomSelect";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  LENGTHOFSUBSCRIPTION,
  SHOWSUBSCRIPTION,
  countries,
} from "@/utils/constants";

type CounterProps = {
  ispProxyInput: {
    country: string;
    mainType: string;
    length: string;
    proxyType: string;
  };
  handleRadioChange: any;
  onCountrySelect: any;
  setIspProxyInput: any;
  renderDCPSliderMarks: any;
  ispProxyValue: any;
  handleIspProxyInputChange: any;
};

function ISP({
  ispProxyInput,
  handleRadioChange,
  onCountrySelect,
  setIspProxyInput,
  renderDCPSliderMarks,
  ispProxyValue,
  handleIspProxyInputChange,
}: CounterProps) {
  return (
    <div>
      <div className="two-cols">
        <div></div>
        <div>
          <div className="proxy_box">
            <div className="inner_proxy_box">
              <input
                type="radio"
                id="test1"
                checked={ispProxyInput.mainType === "dedicated"}
                onChange={(e) => handleRadioChange(e, "dedicated")}
                name="radio-group"
              />
              <label htmlFor="test1">Dedicated</label>
            </div>
            <div className="inner_proxy_box">
              <input
                type="radio"
                id="test3"
                name="radio-group"
                checked={
                  ispProxyInput.mainType === "semiDedicated"
                }
                onChange={(e) => handleRadioChange(e, "semiDedicated")}
              />
              <label htmlFor="test3">Semi-Dedicated</label>
            </div>
          </div>
        </div>
      </div>
      <div className="countries-dropdown-wrapper two-cols">
        <div className="lable-box">
          <label>Select Country:</label>
        </div>

        <CustomSelect
          value={ispProxyInput.country.toUpperCase()}
          onChange={(value: string) => onCountrySelect(value)}
          options={countries}
        />

      </div>
      <div className="price-slider-range two-cols">
        <div className="lable-box">
          <label>Length of Subscription:</label>
        </div>

        <div className="price-slider-range-container">
          <Slider
              aria-label="price slider"
            className="price-slider"
            min={10}
            max={40}
            step={10}
            onChange={(e: any) => {
              setIspProxyInput({
                ...ispProxyInput,
                length: LENGTHOFSUBSCRIPTION[e],
              });
            }}
            value={SHOWSUBSCRIPTION[ispProxyInput.length]}
            marks={renderDCPSliderMarks()}
            activeDotStyle={{
              borderColor: "#fff",
              backgroundColor: "#07b6bf",
            }}
            trackStyle={{
              backgroundColor: "#07b6bf",
              height: 6,
            }}
            railStyle={{
              height: 6,
            }}
            dotStyle={{
              height: 4,
              width: 4,
              bottom: "-2px",
              display: "none",
            }}
            handleStyle={{
              borderColor: "#07b6bf",
              backgroundColor: "#07b6bf",
              opacity: 1,
            }}
          />
        </div>

      </div>

      <div className="no-of-proxies two-cols">
        <div className="lable-box">
          <label>Number of Proxies:</label>
        </div>

        <div className="content-box">
          <input
              aria-label={'proxy-input'}
            className={`proxy-input ${ispProxyValue < 5 && "border-red"}`}
            onChange={handleIspProxyInputChange}
            value={ispProxyValue}
            placeholder=""
            type="number"
          />

          <br />

          <span className="validation-error">
            {ispProxyValue < 5 &&
              ispProxyValue !== "" &&
              "Minimum 5 proxies required"}
          </span>

          <div className="stats">
            <span className="stat-item">
              <b>Starter:</b> <i>5 to 99</i>{" "}
            </span>
            <span className="stat-item">
              <b>Personal:</b> <i>100 to 999</i>{" "}
              <span className="discount-value">-4%</span>
            </span>
            <span className="stat-item">
              <b>Corporate:</b> <i>1k to 4,999</i>{" "}
              <span className="discount-value">-8%</span>
            </span>
            <span className="stat-item">
              <b>Enterprise:</b> <i>5k+</i>{" "}
              <span className="discount-value">-12%</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default React.memo(ISP);
