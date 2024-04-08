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
import styles from '../components/PricingPink.module.css'

type DSPProps = {
  dspMonths: any;
  setDspMonths: any;
  dcpCountry: string;
  dspValue: number;
  handleDspRadioChange: any;
  dspRadio: any;
  onDspCountryChangePink: any;
  renderDCPSliderMarks: any;
  handleDspInputChange: any;
};

function DSPPink({
  dcpCountry,
  handleDspRadioChange,
  dspRadio,
  onDspCountryChangePink,
  dspMonths,
  setDspMonths,
  renderDCPSliderMarks,
  dspValue,
  handleDspInputChange,
}: DSPProps) {
  return (
    <div>
      <div className={styles['two-cols']}>
        <div></div>
        <div className={styles.my_radio}>
          <div className={styles['proxy_box']}>
            {dataCenterProxyRadio[
              dcpCountry as keyof typeof dataCenterProxyRadio
            ].radio.map((r: string, index: any) => (
              <div
                className={styles['inner_proxy_box']}
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
                  onChange={(e: any) => onDspCountryChangePink(e)}
                />
                <label htmlFor={r}>{showRadio(r)}</label>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className={`${styles['countries-dropdown-wrapper']} ${styles['two-cols']}`}>
        <div className={styles['lable-box']}>
          <label>Select Country:</label>
        </div>

        <CustomSelect
          value={dcpCountry.toUpperCase()}
          onChange={(value: string) => onDspCountryChangePink(value)}
          options={countriesDataCenterProxy}
        />
      </div>


      <div className={`${styles['price-slider-range']} ${styles['two-cols']}`}>
        <div className={styles['lable-box']}>
          <label>Length of Subscription:</label>
        </div>
        <div className={`${styles['price-slider-range-container']} ${styles['custom']}`}>
          <Slider
            className={styles['price-slider']}
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
              backgroundColor: "#EE3889",
            }}
            trackStyle={{
              backgroundColor: "#EE3889",
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
              borderColor: "#EE3889",
              backgroundColor: "#EE3889",
              opacity: 1,
            }}
          />
        </div>
      </div>
      <div className={`${styles['no-of-proxies']} ${styles['two-cols']}`}>
        <div className={styles['lable-box']}>
          <label>Number of Proxies:</label>
        </div>
        <div className={styles['content-box']}>
          <input
            aria-label={'proxy-input'}
            className={`${styles['proxy-input']} ${dspValue < 5 ? styles['border-red'] : ''}`}
            placeholder=""
            type="number"
            value={dspValue}
            onChange={handleDspInputChange}
            max={9999}
          />
          <br />
          {dspValue < 5 && (
            <span className={styles['validation-error']}>Minimum 5 proxies required</span>
          )}
          <div className={styles['stats']}>
            <span className={styles['stat-item']}>
              <b>Starter:</b> <i>5 to 99</i>{" "}
            </span>
            <span className={styles['stat-item']}>
              <b>Personal:</b> <i>100 to 999</i>{" "}
              <span className={styles['discount-value']}>-15%</span>
            </span>
            <span className={styles['stat-item']}>
              <b>Corporate:</b> <i>1k to 4,999</i>{" "}
              <span className={styles['discount-value']}>-25%</span>
            </span>
            <span className={styles['stat-item']}>
              <b>Enterprise:</b> <i>5k+</i>{" "}
              <span className={styles['discount-value']}>-30%</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DSPPink;
