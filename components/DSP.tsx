import React from "react";
import {
  dataCenterProxyRadio,
  countriesDataCenterProxy,
  LENGTHOFSUBSCRIPTION,
  SHOWSUBSCRIPTION
} from "@/utils/constants";
import { showRadio } from "@/utils/TextDisplay";
import CustomSelect from "@/components/CustomSelect";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type DSPProps = {
  dspMonths: any;
  setDspMonths: any;
  dcpCountry: string;
  dspValue: number;
  handleDspRadioChange: any;
  dspRadio: any;
  onDspCountryChange: any;
  renderDCPSliderMarks: any;
  handleDspInputChange: any;
};

function DSP({
  dcpCountry,
  handleDspRadioChange,
  dspRadio,
  onDspCountryChange,
  dspMonths,
  setDspMonths,
  renderDCPSliderMarks,
  dspValue,
  handleDspInputChange,
}: DSPProps) {
  return (
    <div>
      <div className="two-cols">
        <div></div>
        <div>
          <div className="proxy_box">
            {dataCenterProxyRadio[
              dcpCountry as keyof typeof dataCenterProxyRadio
            ].radio.map((r: string, index: any) => (
              <div
                className="inner_proxy_box"
                key={index}
                onClick={() => handleDspRadioChange(r)}
              >
                <input
                  type="radio"
                  id={r}
                  key={r}
                  name={r}
                  value={r}
                  checked={dspRadio === r}
                  onChange={(e: any) => onDspCountryChange(e)}
                />
                <label htmlFor={r}>{showRadio(r)}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="countries-dropdown-wrapper two-cols">
        <div className="lable-box">
          <label>Select Country:</label>
        </div>

        <CustomSelect
          value={dcpCountry.toUpperCase()}
          onChange={(value: string) => onDspCountryChange(value)}
          options={countriesDataCenterProxy}
        />
      </div>

      <div className="price-slider-range two-cols">
        <div className="lable-box">
          <label>Length of Subscription:</label>
        </div>
        <div className="price-slider-range-container">
          <Slider
            className="price-slider"
            min={10}
            max={40}
            step={10}
            onChange={(e: any) => {
              setDspMonths(LENGTHOFSUBSCRIPTION[e]);
            }}
            value={SHOWSUBSCRIPTION[dspMonths]}
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
            className={`proxy-input ${dspValue < 5 && "border-red"}`}
            placeholder=""
            type="number"
            value={dspValue}
            onChange={handleDspInputChange}
            max={9999}
          />
          <br />
          {dspValue < 5 && (
            <span className="validation-error">Minimum 5 proxies required</span>
          )}

          <div className="stats">
            <span className="stat-item">
              <b>Starter:</b> <i>5 to 99</i>{" "}
            </span>
            <span className="stat-item">
              <b>Personal:</b> <i>100 to 999</i>{" "}
              <span className="discount-value">-15%</span>
            </span>
            <span className="stat-item">
              <b>Corporate:</b> <i>1k to 4,999</i>{" "}
              <span className="discount-value">-25%</span>
            </span>
            <span className="stat-item">
              <b>Enterprise:</b> <i>5k+</i>{" "}
              <span className="discount-value">-30%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DSP);
