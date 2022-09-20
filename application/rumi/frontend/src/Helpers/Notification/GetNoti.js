import React, { useEffect, useState } from "react";
import Axios from "axios";
import configData from "../../Configs/config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatchNoti from "./PatchNoti";

const GetNoti = () => {
    const [noti, setNoti] = useState([]);
    const customId = " ";
    useEffect(() => {
        Axios.get(configData.SERVER_URL + `notifications`)
            .then((response) => {
                setNoti(response.data.results);
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }, []);

    return (
        <div>
            {noti
                ? noti.map((value, key) => (
                      <div key={value.id}>
                          {(() => {
                              // eslint-disable-next-line eqeqeq
                              if (value.unread == "1") {
                                  return (
                                      <div>
                                          {toast.info(value.text, {
                                              position: "top-right",
                                              autoClose: 4000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              closeButton: false,
                                              progress: 0,
                                              toastId: customId,
                                          })}
                                          <PatchNoti />
                                      </div>
                                  );
                              } else {
                                  return <></>;
                              }
                          })()}
                      </div>
                  ))
                : null}
        </div>
    );
};

export default GetNoti;
