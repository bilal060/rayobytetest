import React, { useEffect, useInsertionEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { dataCenterProxyRadio, ispProxy, pricingTabs, rangePoints, DISCOUNTS, MONTHVALUE } from "@/utils/constants";
import { getRoundOffValue } from "@/utils/DcpFormula";
import RadialChart from "@/components/radialChart";
import Button from "@/components/Button";
import DSP from "@/components/DSP";
import Residential from "@/components/Residential";
import ISP from "@/components/ISP";

export interface HelloWorldProps {
  children?: React.ReactNode;
  className?: string;
  verbose?: boolean;
}
 const calculateResidentialProxy = (input: number): number => {
  // Example calculation logic, replace with your actual calculation
  return input * 2; // Just a placeholder calculation
};
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
          <div className="mark-label">
            <div className="duration">
              <p>{months as string}</p>
              <p>{months === 1 ? "MONTH" : "MONTHS"}</p>
            </div>
            {value !== "10" && <span className="discount">{discount} %</span>}
          </div>
      ),
    };
  }

  return marks;
};

const PricingComponent = ({ className }: HelloWorldProps) => {
  const isSmallMobile = useMediaQuery({ maxWidth: 390 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1440 });
  const [selectedTab, setSelectedTab] = useState(pricingTabs.DataCenterProxies);
  const [residentialInput, setResidentialInput] = useState(1);
  const [residentialProxyCalculated, setResidentialProxyCalculated] = useState<any | 0>(calculateResidentialProxy(Number(residentialInput)));
  useInsertionEffect(() => {
    console.log('Component inserted into the DOM');
  });
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
  const [dspRadio, setDspRadio] = useState(dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio].radio[0]);
  const [dspMonths, setDspMonths] = useState<any | "">("threeMonthDisc");
  const [dspValue, setDspValue] = useState(5);
  const [dspPackage, setDspPackage] = useState<any | "">("starterDisc");
  const [dspCalculatedValue, setDspCalculatedValue] = useState<any | 0>(0);

  const onCountrySelect = (code: string): void => {
    setIspProxyInput({ ...ispProxyInput, country: code.toLowerCase() });
    setSelected(code.toLowerCase());
  };

  const onDspCountryChange = (code: string) => {
    setDcpCountry(code.toLowerCase());
    setDspRadio(dataCenterProxyRadio[code.toLowerCase() as keyof typeof dataCenterProxyRadio]?.radio[0]);
  };

  useEffect(() => {
    let finalValue = 0;
    let discount = 0;
    let discountTwo = 0;

    if (dspMonths !== "oneMonthDisc") {
      const baseValue = Number(dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][dspRadio]["basicPrice"] * dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][dspRadio][dspMonths]);

      discount = getRoundOffValue(dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][dspRadio]["basicPrice"] - baseValue);
    } else {
      discount = dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][dspRadio]["basicPrice"];
    }
    if (dspPackage !== "starterDisc") {
      discountTwo = discount * Number(dataCenterProxyRadio[dcpCountry as keyof typeof dataCenterProxyRadio][dspRadio][dspPackage]);

      finalValue = getRoundOffValue(discount - discountTwo);
    } else {
      finalValue = discount;
    }

    setDspCalculatedValue(Number((Number(finalValue) * Number(dspValue) * Number(MONTHVALUE[dspMonths])).toFixed(2)));
  }, [dspRadio, dspMonths, dspValue, dcpCountry, dspPackage]);

  const handleChangeResidentialProxies = ({ target: { value } }: any) => {
    const re = /^[0-9\b]+$/;

    if (re.test(value) || value == "") {
      setResidentialInput(value);
      setResidentialProxyCalculated(calculateResidentialProxy(Number(value)));
    }
  };

  const handleRadioChange = (e: any, name: any) => {
    setIspProxyInput({ ...ispProxyInput, mainType: name });
  };

  const handleIspProxyInputChange = (e: any) => {
    if (e.target.value >= 5 && e.target.value <= 99) {
      setIspProxyInput({ ...ispProxyInput, proxyType: "starterDisc" });
    } else if (e.target.value >= 100 && e.target.value <= 999) {
      setIspProxyInput({ ...ispProxyInput, proxyType: "personalDisc" });
    } else if (e.target.value >= 1000 && e.target.value <= 4999) {
      setIspProxyInput({ ...ispProxyInput, proxyType: "corporate" });
    }
    setIspProxyValue(e.target.value);
  };

  useEffect(() => {
    let finalValue = 0;
    let discount = 0;
    const baseValue = ispProxyValue * ispProxy[ispProxyInput.country as keyof typeof ispProxy][ispProxyInput.mainType][ispProxyInput.length];

    if (ispProxyInput.proxyType !== "starterDisc") {
      discount = baseValue * Number(ispProxy[ispProxyInput.country as keyof typeof ispProxy][ispProxyInput.mainType][ispProxyInput.proxyType]);

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

  const renderISPProxiesChartValue = () => {
    if (ispProxyInput.length === "oneMonthDisc") {
      return 25;
    }
    if (ispProxyInput.length === "threeMonthDisc") {
      return 50;
    }
    if (ispProxyInput.length === "sixMonthDisc") {
      return 75;
    }
    if (ispProxyInput.length === "twelveMonthDisc") {
      return 100;
    }

    return 0;
  };

  const getPerMonthValue = (tab: string) => {
    if (tab === "isp") {
      return Number((Number(ispCalculatedValue) / Number(MONTHVALUE[ispProxyInput.length])).toFixed(2));
    }

    if (tab === "dataCenter") {
      return Number((Number(dspCalculatedValue) / Number(MONTHVALUE[dspMonths])).toFixed(2));
    }

    return 0;
  };

  const renderChartDimensions = () => {
    if (isSmallMobile) return 330;
    if (isMobile) return 360;
    if (isTablet) return 400;
    if (isSmallDesktop) return 300;
    if (isLargeDesktop) return 400;

    return 500;
  };
  const renderComponentBasedOnTab = () => {
    switch (selectedTab) {
      case pricingTabs.DataCenterProxies:
        return (
            <DSP
                dcpCountry={dcpCountry}
                handleDspRadioChange={handleDspRadioChange}
                dspRadio={dspRadio}
                onDspCountryChange={onDspCountryChange}
                setDspMonths={setDspMonths}
                dspMonths={dspMonths}
                renderDCPSliderMarks={renderDCPSliderMarks}
                dspValue={dspValue}
                handleDspInputChange={handleDspInputChange}
            />
        );
      case pricingTabs.ResidentialProxies:
        return (
            <Residential
                resedentialInput={residentialInput}
                handleChangeResidentialProxies={handleChangeResidentialProxies}
            />
        );
      case pricingTabs.ISPProxies:
        return (
            <ISP
                ispProxyInput={ispProxyInput}
                setIspProxyInput={setIspProxyInput}
                handleRadioChange={handleRadioChange}
                onCountrySelect={onCountrySelect}
                renderDCPSliderMarks={renderDCPSliderMarks}
                ispProxyValue={ispProxyValue}
                handleIspProxyInputChange={handleIspProxyInputChange}
            />
        );
      default:
        return null;
    }
  };
  return (
      <section className={`pricing-header ${className}`}>
        <div className="section-container">
          <div className="pricing-row">

          </div>
        </div>
      </section>
  );
};

export default PricingComponent;
