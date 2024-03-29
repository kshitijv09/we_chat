import React from "react";
import "./LandingPage.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";

export default function LandingPage() {
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <div className="outer-container">
      <div className="img-section">
        <Tilt
          options={defaultOptions}
          style={{
            width: "70%",
            height: "80%" /* , border: "pink solid 1px"  */,
          }}
        >
          <div className="app-img">
            <div className="upper-sec">
              <div className="welcome-1">
                <div>
                  <div style={{ color: "#b9bbc1", fontSize: "0.8em" }}>
                    Welcome to
                  </div>
                  <div style={{ fontSize: "1.4em" }}>WeChat</div>
                </div>
                <div>
                  <img src={require("../../assets/n-0.jfif")} />
                </div>
              </div>
              <div className="story-heading">
                <div>Story</div>
                <div style={{ color: "#b9bbc1" }}>See All</div>
              </div>
              <div className="stories">
                <div className="story-no">
                  <div>
                    <img src={require("../../assets/s-0.png")} />
                  </div>
                  <div>Add</div>
                </div>

                <div className="story-no">
                  <div>
                    <img src={require("../../assets/s1.png")} />
                  </div>
                  <div>Stuart</div>
                </div>
                <div className="story-no">
                  <div>
                    <img src={require("../../assets/s-2.png")} />
                  </div>
                  <div>Marion</div>
                </div>
                <div className="story-no">
                  <div>
                    <img src={require("../../assets/s-3.png")} />
                  </div>
                  <div>Kendall</div>
                </div>
              </div>
            </div>
            <div className="lower-sec">
              <div className="contacts-container">
                <div>
                  <p style={{ fontSize: "22px" }}>Recent Chat</p>
                </div>
                <div className="contacts">
                  <div>
                    <img src={require("../../assets/img-1.png")} />
                  </div>
                  <div className="Message-text">
                    <p className="name">Mark Wood</p>
                    <p className="Message"> Comeback</p>
                  </div>
                  <div className="Message">19:35</div>
                </div>
                <div className="contacts">
                  <div>
                    <img src={require("../../assets/img-4.png")} />
                  </div>
                  <div className="Message-text">
                    <p className="name">Peter Parker</p>
                    <p> Wassup!!</p>
                  </div>
                  <div className="Message">21:00</div>
                </div>
                <div className="contacts">
                  <div>
                    <img src={require("../../assets/img-2.jpg")} />
                  </div>
                  <div className="Message-text">
                    <p className="name">Rebecca F.</p>
                    <p className="Message"> Another Day</p>
                  </div>
                  <div className="Message">15:55</div>
                </div>
                <div className="contacts">
                  <div>
                    <img src={require("../../assets/img-3.jpg")} />
                  </div>
                  <div className="Message-text">
                    <p className="msg-name">Bairstow</p>
                    <p className="Message" style={{ marginTop: "0px" }}>
                      {" "}
                      Don't leave
                    </p>
                  </div>
                  <div className="Message">10:05</div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
      <div className="text-section">
        <Nav />
        <div className="main-text">
          <div>It's easy talking to</div>
          <div>your friends</div>
          <div>with WeChat</div>
        </div>
        <div className="sub-text">
          <div>WeChat is a lifestyle for over a billion users</div>
          <div>around the world</div>
        </div>
        <Link to="/login">
          <div className="btn-X">
            <button className="btn-btn-Y"> Get Started</button>
          </div>
        </Link>
        <div className="stats">
          <div>
            <div className="stat-no">50K+</div>
            <div className="stat-text">
              <div>Visitors around</div>
              <div>world</div>
            </div>
          </div>
          <div>
            <div className="stat-no">5.0</div>
            <div className="stat-text">
              <div>Rating of </div>
              <div>App</div>
            </div>
          </div>
          <div>
            <div className="stat-no">300M+</div>
            <div className="stat-text">
              <div>People using</div>
              <div>WeChat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
