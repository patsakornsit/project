import "./intro.css";
function MyButton() {
  return (
    <div className="backgroud-intro1">
    <body class= "intro1">
      <div>

        <nav>
          <li>
            <a
              className="home-nav-intro1"
              href="/"
              style={{
                position: "absolute",
                textDecoration: "none",
                zIndex: 2,
                left: "600px",
                top: "10px",
              }}
            >
              what is our website
            </a>
          </li>
          <li>
            <center>
              <a
                className="choosing-nav-intro1"
                href="/choosing"
                style={{
                  position: "absolute",
                  textDecoration: "none",
                  zIndex: 2,
                  top: "10px",
                  textAlign: "center",
                }}
              >
                career
              </a>
            </center>
          </li>
          <li>
            <a
              className="list-nav-intro1"
              href="/list"
              style={{
                position: "absolute",
                textDecoration: "none",
                zIndex: 2,
                right: "600px",
                top: "10px",
              }}
            >
              list
            </a>
          </li>
        </nav>
        <div className="eclipse1-intro1"></div>
        <div className="eclipse2-intro1"></div>
        <div
          className="nav-frame-intro1"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "42px",
          }}
        ></div>
        <h1
          style={{
            fontSize: "96px",
            textAlign: "left",
            position: "absolute",
            top: "25%",
            zIndex: 2,
            left: "2%",
          }}
        >
          Chat GPT
        </h1>
        {/* <img
        className="book"
        src={require("./background.jpg")}
        alt="book opening "
        style={{
          position: "absolute",
          top: "0px",
          right: "-335px",
          width: "1218px",
          height: "auto",
          zIndex:-2
        }}
      /> */}
        <h2
          style={{
            fontSize: "48px",
            fontWeight: "light",
            textAlign: "left",
            position: "absolute",
            top: "40%",
            zIndex: 2,
            left: "2%",
          }}
        >
          Online Course Suggestion
        </h2>
        {/* <h3
        style={{
          fontSize: "36px",
          fontWeight: "",
          position: "absolute",
          top: "50%",
          zIndex: 2,
        }}
      >
      เว็บเเอปเพื่อการหาคอร์สเรียนเพื่อไปถึงเป้าหมาย
    </h3> */}
        <a
          href="/choosing"
          style={{
            position: "absolute",
            textDecoration: "none",
            textAlign: "left",
            zIndex: 2,
            top: "50%",
            left: "3%",
          }}
        >
          <h4
            className="decorated-button-intro1"
            style={{
              display: "inline-block",
              fontWeight:"bold",
              fontSize:"25px"
            }}
          >
            Sign up for free{" "}
          </h4>
        </a>
      </div>
    </body>
    </div>
  );
}
export default MyButton;