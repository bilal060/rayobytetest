import React, { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import {
  dataCenterProxyRadio,
  ispProxy,
  pricingTabs,
  rangePoints,
  DISCOUNTS,
  MONTHVALUE,
} from "@/utils/constants";

import { getRoundOffValue } from "@/utils/DcpFormula";
import RadialChart from "@/components/radialChart";
import ButtonPink from "@/components/ButtonPink";
import styles from '../components/PricingPink.module.css'
import DSPPink from "@/components/DSPPink";

export interface HelloWorldProps {
  children?: React.ReactNode;
  className?: string;
  verbose?: boolean;
}

const renderDCPSliderMarks = () => {
  const marks: {
    [key: string]: {
      label: JSX.Element;
    };
  } = {};

  for (const [value, months] of Object.entries(rangePoints)) {
    const discount = DISCOUNTS[value];
    marks[value] = {
      label: (
        <div className={styles['mark-label']}>
          <div className={styles['duration']}>
            <p>{months as string}</p>
            <p>{months === 1 ? "MONTH" : "MONTHS"}</p>
          </div>
          {value !== "10" && <span className={styles['discount']}>{discount} %</span>}
        </div>
      ),
    };
  }

  return marks;
};

const DataCenterPricingComponent = ({
  className,
}: HelloWorldProps) => {
  const isSmallMobile = useMediaQuery({ maxWidth: 390 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1440 });
  const [selectedTab, setSelectedTab] = useState(pricingTabs.DataCenterProxies);

  const [ispProxyInput, setIspProxyInput] = useState({
    country: "us",
    mainType: "dedicated",
    length: "threeMonthDisc",
    proxyType: "starterDisc",
  });

  const [ispProxyValue, setIspProxyValue] = useState<any | 0>(5);
  const [ispCalculatedValue, setIspCalculatedValue] = useState<any | 0>(0);

  const [dcpCountry, setDcpCountry] = useState("us");

  const [selected, setSelected] = useState("us");
  const [dspRadio, setDspRadio] = useState(
    dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio]
      .radio[0]
  );

  const [dspMonths, setDspMonths] = useState<any | "">("threeMonthDisc");
  const [dspValue, setDspValue] = useState(5);
  const [dspPackage, setDspPackage] = useState<any | "">("starterDisc");
  const [dspCalculatedValue, setDspCalculatedValue] = useState<any | 0>(0);

  const onCountrySelect = (code: string): void => {
    setIspProxyInput({ ...ispProxyInput, country: code.toLowerCase() });
    setSelected(code.toLowerCase());
  };

  const onDspCountryChangePink = (code: string) => {

    if (typeof code === 'string') {
      setDcpCountry(code.toLowerCase());
    }
    setDspRadio(
      dataCenterProxyRadio[
        code.toLowerCase() as keyof typeof dataCenterProxyRadio
      ]?.radio[0]
    );
  };

  useEffect(() => {
    let finalValue = 0;
    let discount = 0;
    let discountTwo = 0;

    if (dspMonths !== "oneMonthDisc") {
      const baseValue = Number(
        dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][
        dspRadio
        ]["basicPrice"] *
        dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][
        dspRadio
        ][dspMonths]
      );

      discount = getRoundOffValue(
        dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][
        dspRadio
        ]["basicPrice"] - baseValue
      );
    } else {
      discount =
        dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][
        dspRadio
        ]["basicPrice"];
    }
    if (dspPackage !== "starterDisc") {
      discountTwo =
        discount *
        Number(
          dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][
          dspRadio
          ][dspPackage]
        );

      finalValue = getRoundOffValue(discount - discountTwo);
    } else {
      finalValue = discount;
    }

    setDspCalculatedValue(
      Number(
        (
          Number(finalValue) *
          Number(dspValue) *
          Number(MONTHVALUE[dspMonths])
        ).toFixed(2)
      )
    );
  }, [dspRadio, dspMonths, dspValue, dcpCountry, dspPackage]);

  useEffect(() => {
    let finalValue = 0;
    let discount = 0;
    const baseValue =
      ispProxyValue *
      ispProxy[ispProxyInput.country as keyof typeof ispProxy][
      ispProxyInput.mainType
      ][ispProxyInput.length];

    if (ispProxyInput.proxyType !== "starterDisc") {
      discount =
        baseValue *
        Number(
          ispProxy[ispProxyInput.country as keyof typeof ispProxy][
          ispProxyInput.mainType
          ][ispProxyInput.proxyType]
        );

      finalValue = baseValue - discount;
    } else {
      finalValue = baseValue;
    }

    setIspCalculatedValue(finalValue);
  }, [ispProxyInput, ispProxyValue]);

  const handleDspInputChange = ({ target }: any) => {
    const value = target.value;

    if (value >= 5 && value <= 99) {
      setDspPackage("starterDisc");
    } else if (value >= 100 && value <= 999) {
      setDspPackage("personalDisc");
    } else if (value >= 1000 && value <= 4999) {
      setDspPackage("corporate");
    }
    setDspValue(value);
  };

  const handleDspRadioChange = (e: any) => {
    setDspRadio(e);
  };

  const renderMonthsForChart = {
    oneMonthDisc: "1 month",
    threeMonthDisc: "3 month",
    sixMonthDisc: "6 month",
    twelveMonthDisc: "12 month",
  };

  const renderDCPChartValue = () => {
    if (dspMonths === "oneMonthDisc") {
      return 25;
    }
    if (dspMonths === "threeMonthDisc") {
      return 50;
    }
    if (dspMonths === "sixMonthDisc") {
      return 75;
    }
    if (dspMonths === "twelveMonthDisc") {
      return 100;
    }

    return 0;
  };


  const getPerMonthValue = (tab: string) => {
    if (tab === "isp") {
      return Number(
        (
          Number(ispCalculatedValue) / Number(MONTHVALUE[ispProxyInput.length])
        ).toFixed(2)
      );
    }

    if (tab === "dataCenter") {
      return Number(
        (Number(dspCalculatedValue) / Number(MONTHVALUE[dspMonths])).toFixed(2)
      );
    }

    return 0;
  };

  const renderChartDimensions = () => {
    if (isSmallMobile) return 310;
    if (isMobile) return 350;
    if (isTablet) return 400;
    if (isSmallDesktop) return 300;
    if (isLargeDesktop) return 400;

    return 500;
  };

  return (
    <section className={`${styles['pricing-header']} pinkcomponent ${className}`}>
      <div className={styles['section-container']}>
        <div className={styles['pricing-row']}>
          <div className={styles['left-col']}>
            <div className={`${styles['proxy-types']} ${styles['two-cols']}`}>
              <div className={styles['lable-box']}>
                <label>Proxy Type:</label>
              </div>
              <div className={styles['content-box']}>
                <div className={styles['proxy_side']}>
                  <button
                    className={`${styles['btn-proxy']} ${selectedTab === pricingTabs.DataCenterProxies ? styles['active'] : ''
                      }`}
                    onClick={() => {
                      setSelectedTab(pricingTabs.DataCenterProxies);
                    }}
                  >
                    Data Center Proxies
                  </button>
                </div>
              </div>
            </div>

            {selectedTab == pricingTabs.DataCenterProxies ? (
              <>
                <DSPPink
                  dcpCountry={dcpCountry}
                  handleDspRadioChange={handleDspRadioChange}
                  dspRadio={dspRadio}
                  onDspCountryChangePink={onDspCountryChangePink}
                  setDspMonths={setDspMonths}
                  dspMonths={dspMonths}
                  renderDCPSliderMarks={renderDCPSliderMarks}
                  dspValue={dspValue}
                  handleDspInputChange={handleDspInputChange}
                />
              </>
            ) : ''}
          </div>

          <div className={styles['right-col']}>
            <div className={styles['chart-wrapper']}>
              <div className={styles['chart-content']}>
                {(selectedTab === pricingTabs.DataCenterProxies &&
                  dspValue > 5000) ? (
                  <div className={styles['contact-us']}>
                    <p className={styles['contact-us-text']}>
                      Get a custom plan for your business and save upto
                      <em>
                        <strong>30%</strong>
                      </em>
                      or more on orders of
                      <em>
                        <strong>5000+</strong>
                      </em>
                      proxies.
                    </p>
                    <a
                      href="https://rayobyte.com/contact-us/"
                      className={styles['contact-us-pink']}
                      target="_blank"
                    >
                      Contact Us
                    </a>
                  </div>
                ) : (
                  <>
                    <h1>
                      <sup>$</sup>
                      {selectedTab === pricingTabs.DataCenterProxies &&
                        Number(dspCalculatedValue).toFixed(2)}
                    </h1>
                    <hr />
                    <div className={styles['chart-sub-content']}>
                      <div className={styles['col-1']}>
                        <p>
                          {selectedTab === pricingTabs.DataCenterProxies && (
                            <>
                              {typeof dspCalculatedValue === "number" &&
                                dspCalculatedValue
                                ? Number(
                                  dspCalculatedValue /
                                  (Number(dspValue) *
                                    MONTHVALUE[dspMonths])
                                ).toFixed(2)
                                : "--"}
                              /IP
                            </>
                          )}
                        </p>
                        <p>{dspValue} IPs</p>
                        <p>
                          $
                          {getPerMonthValue("dataCenter")}
                          /Mo
                        </p>
                      </div>
                      <div className={styles['col-2']}>
                        <p className={styles['radio-label']}>
                          {selectedTab === pricingTabs.DataCenterProxies
                            && dspRadio}
                        </p>
                        <p>{renderMonthsForChart[dspMonths as keyof typeof renderMonthsForChart]} </p>
                        <p className="country-name">
                          {dcpCountry}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {window !== undefined && (
                <div id="chart">
                  <RadialChart
                    progress={
                      renderDCPChartValue()
                    }
                    color="#E5E5E5"
                    progressColor="#EE3889"
                    dimension={renderChartDimensions()}
                  />
                </div>
              )}
            </div>
            {((selectedTab === pricingTabs.DataCenterProxies &&
              dspValue <= 5000)) && (
                <ButtonPink
                  title="Buy Now"
                  link={`https://dashboard.proxy.rayobyte.com/purchase?country=${selectedTab === pricingTabs.DataCenterProxies
                    ? dcpCountry
                    : selected
                    }&category=${selectedTab === pricingTabs.DataCenterProxies
                      ? dspRadio === "semi-dedicated"
                        ? "semi-3"
                        : "dedicated"
                      : ispProxyInput.mainType === "dedicated"
                        ? "dedicated"
                        : "semi-3"
                    }&quantity=${selectedTab === pricingTabs.DataCenterProxies
                      ? dspValue
                      : ispProxyValue
                    }&billingCycle=${selectedTab === pricingTabs.DataCenterProxies
                      ? dspMonths === "oneMonthDisc"
                        ? "monthly"
                        : dspMonths === "threeMonthDisc"
                          ? "quarterly"
                          : dspMonths === "sixMonthDisc"
                            ? "semiannually"
                            : "annually"
                      : ispProxyInput.length === "oneMonthDisc"
                        ? "monthly"
                        : ispProxyInput.length === "threeMonthDisc"
                          ? "quarterly"
                          : ispProxyInput.length === "sixMonthDisc"
                            ? "semiannually"
                            : "annually"
                    }&_gl=1%2a116hez4%2a_ga%2aNzExNzM2NzMxLjE2NzYzMTA5NzQ.%2a_ga_TK61YTK3F7%2aMTY3NzUwNzk2Ni4yNS4xLjE2Nzc1MDg2MjQuNTYuMC4w`
                  }
                  className={styles['btn']}
                />

              )}
            <style jsx>{`
        .btn{
  padding: 12px 20px;
  width: 248px;
  height: 52px;
  background: #EE3889 !important;
  font-family: var(--font-family-inter);
  border: 2px solid #EE3889 !important;
  border-radius: 4px !important;
  display: block;
  text-align: center;
  color: #fff !important;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  text-transform: uppercase;
  margin: 20px auto 0;
  text-decoration: none;
  -webkit-border-radius: 4px !important;
  -moz-border-radius: 4px !important;
  -ms-border-radius: 4px !important;
  -o-border-radius: 4px !important;
}

.btn:hover {
  background-color: #ffffff;
  color: #EE3889 !important;
}
      `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataCenterPricingComponent;
