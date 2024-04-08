import React from "react";

type CounterProps = {
  resedentialInput: number;
  handleChangeResidentialProxies: any;
};

function Residential({
  resedentialInput,
  handleChangeResidentialProxies,
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
                id="test2"
                defaultChecked
                name="radio-group"
              />
              <label htmlFor="test2">Rotating</label>
            </div>
          </div>
        </div>
      </div>

      <div className="no-of-proxies residential-gbs two-cols">
        <div className="lable-box">
          <label>Gigabytes:</label>
        </div>

        <div className="content-box">
          <input
            aria-label={'proxy-input'}
            className={`proxy-input ${resedentialInput < 1 && "border-red"}`}
            placeholder=""
            value={resedentialInput}
            onChange={handleChangeResidentialProxies}
            type="number"
            max={1000}
          />
          <br />
          {resedentialInput < 1 && (
            <span className="validation-error">Minimum 1 proxy required</span>
          )}

          <div className="table-responsive">
            <table className="table custom-table">
              <tbody>
                <tr>
                  <td>
                    <div className="row">
                      <div className="header">Starter:</div>
                      <div className="data"><i>1 - 15 GB</i></div>
                      <div className="data"><i>$15/GB</i></div>
                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="header">Personal:</div>
                      <div className="data"><i>16 - 49 GB</i></div>
                      <div className="data"><i>$12.50/GB</i></div>
                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="header">Consumer:</div>
                      <div className="data"><i>50 - 99 GB</i></div>
                      <div className="data"><i>$7/GB</i></div>
                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="header">Professional:</div>
                      <div className="data"><i>100 - 249 GB</i></div>
                      <div className="data"><i>$6/GB</i></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table custom-table">
              <tbody>
                <tr>
                  <td>
                    <div className="row">
                      <div className="header">Business:</div>
                      <div className="data"><i>250 - 499 GB</i></div>
                      <div className="data"><i>$5/GB</i></div>
                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="header">Corporate:</div>
                      <div className="data"><i>500 - 999 GB</i></div>
                      <div className="data"><i>$4/GB</i></div>

                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="header">Enterprise:</div>
                      <div className="data"><i>1 - 4.9 TB</i></div>
                      <div className="data"><i>$3/GB</i></div>

                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="header">Custom:</div>
                      <div className="data"><i>5TB +</i></div>
                      <div className="data"><a className={'contact-us-text-blue'} href={'mailto:sales@rayobyte.com'}><i>Contact Us</i></a></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Residential);
