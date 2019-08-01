/* eslint-disable */
// Import React
import React from "react";
import Prism from "prismjs";
// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Link,
  Deck,
  Table,
  TableHeader,
  TableRow,
  TableHeaderItem,
  TableItem,
  TableBody,
  CodePane,
  Heading,
  ListItem,
  List,
  Image,
  Notes,
  Quote,
  Slide,
  Text,
  Markdown,
  Appear,
  Layout,
  Fill,
  Code
} from "spectacle";
import CodeSlide from "spectacle-code-slide";
import preloader from "spectacle/lib/utils/preloader";
// Import theme
//import createTheme from "spectacle/lib/themes/default";
import createTheme from "spectacle-theme-nova";

/* Custom Nova syntax highlighting */
import "spectacle-theme-nova/syntax/prism.nova.css";
// import "spectacle-theme-nova/syntax/prism-javascript";

const images = {
  pattern1: require("./assets/pattern1.png"),
  pattern2: require("./assets/pattern2.png"),
  code_mapping: require("./assets/code_mapping.png")
};

preloader(images);

// Require CSS
// require("normalize.css");

//import { theme } from "spectacle-theme-solarized-light";
import { prismLight } from "spectacle/lib/themes/default";
import { prismDark } from "spectacle/lib/themes/default";
const theme = createTheme(null, {
  prism: {
    light: prismLight,
    dark: prismDark
  }
});
/* const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
); */

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Error Handling
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            in node.js services
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            Error handling is always difficult
          </Heading>
          <List>
            <ListItem>Error thrown from other libraries</ListItem>
            <ListItem>
              Error thrown from HTTP request(Timeout/5xx error ...)
            </ListItem>
            <ListItem>Error thrown from Database connection/access</ListItem>
            <ListItem>Error due to invalid input from client</ListItem>
            <ListItem>and more...</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            No matter which async pattern, you need CATCH error
          </Heading>
          <List>
            <ListItem>callback</ListItem>
            <ListItem>Promise</ListItem>
            <ListItem>async/await</ListItem>
          </List>
        </Slide>
        <CodeSlide
          transition={[]}
          color="white"
          // textSize={25}
          lang="js"
          code={require("!raw-loader!./assets/basic_error.js")}
          ranges={[
            { loc: [3, 13], title: "what to do when catching" },
            {
              loc: [14, 17],
              note: "Not good, console is not intended to push to prod"
            },
            { loc: [17, 20], note: "Not good, debug is disabled on prod" },
            { loc: [20, 23], note: "Not good, swallowing the error" },
            { loc: [23, 27], note: "Good, but still not enough" }
          ]}
        />
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            Trackable & Searchable
          </Heading>
          <List>
            <ListItem>Message(description)</ListItem>
            <ListItem>Origin(where is it from)</ListItem>
            <ListItem>Callstack</ListItem>
            <ListItem>Search by x-transaction-id</ListItem>
            <ListItem>Search by other meta(orderId, userId, etc.)</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            Extend the default Error class
          </Heading>
          <List>
            <ListItem>Make sure `new Error` with message</ListItem>
            <ListItem>
              Define error code for frontend or downstream services
            </ListItem>
            <ListItem>Capable to include other meta info</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            Don't built from the scratch
          </Heading>
          <Markdown>
            {`
* es6-errors(https://github.com/bjyoungblood/es6-error)
* It takes care of \`captureStackTrace\` when you extend it
           `}
          </Markdown>
        </Slide>
        <CodeSlide
          transition={[]}
          color="white"
          // textSize={25}
          lang="js"
          code={require("!raw-loader!./assets/es6error.js")}
          ranges={[{ loc: [0, 11], title: "es6-error sample" }]}
        />
        <CodeSlide
          transition={[]}
          color="white"
          // textSize={25}
          lang="js"
          code={require("!raw-loader!./assets/service_error.js")}
          ranges={[
            { loc: [4, 8], title: "Extend from es6-error" },
            {
              loc: [18, 21],
              note: "Define error code and extra"
            },
            {
              loc: [21, 27],
              note: "If logger is passed, record the log directly"
            }
          ]}
        />
        <CodeSlide
          transition={[]}
          color="white"
          // textSize={25}
          lang="js"
          code={require("!raw-loader!./assets/caller_sample.js")}
          ranges={[
            { loc: [4, 10], title: "How to use" },
            {
              loc: [18, 24],
              note: "You also can attach the extra data"
            }
          ]}
        />
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} caps textColor="secondary">
            Two patterns when logging error
          </Heading>
          <List>
            <ListItem>Module granularity(Model / submodule)</ListItem>
            <ListItem>Error thrown from an underneath submodule</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} caps textColor="secondary">
            pattern A
          </Heading>
          <List>
            <Layout>
              <Fill>
                <Image
                  src={images.pattern1.replace("/", "")}
                  margin="0px auto 40px"
                />
              </Fill>
            </Layout>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} caps textColor="secondary">
            pattern B
          </Heading>
          <List>
            <Layout>
              <Fill>
                <Image
                  src={images.pattern2.replace("/", "")}
                  margin="0px 10px 20px"
                />
              </Fill>
            </Layout>
          </List>
        </Slide>
        <CodeSlide
          transition={[]}
          color="white"
          // textSize={25}
          lang="js"
          code={require("!raw-loader!./assets/log_txnid.js")}
          ranges={[
            { loc: [7, 22], title: "Pattern A" },
            {
              loc: [11, 17],
              note: "Passing context(logger/x-transaction-id) to fsm explicitly"
            },
            {
              loc: [23, 39],
              title: "Pattern B"
            },
            {
              loc: [26, 34],
              note:
                "Attach whatever you want, and the log is still automatically recorded"
            }
          ]}
        />
        <CodeSlide
          transition={[]}
          color="white"
          // textSize={25}
          lang="js"
          code={require("!raw-loader!./assets/lib_error.js")}
          ranges={[
            { loc: [27, 41], title: "Error factory returning a closure" },
            {
              loc: [8, 15],
              title: "Create(Clone) another ServiceError with an existing one"
            },
            {
              loc: [27, 28],
              title: "Logger as the argument of ServiceErrorFacotry"
            },
            {
              loc: [28, 32],
              title: "Append the args coz Logger is always the 4th arg"
            },
            {
              loc: [32, 34],
              title:
                "A new instance cloned with logger so it's automatically logged"
            },
            {
              loc: [33, 39],
              title: "Deal with the stackTrace",
              note: "we don't want the wrapper to be in the stack"
            }
          ]}
        />
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} caps textColor="secondary">
            Error code mapping
          </Heading>
          <List>
            <ListItem>
              Error code mapping from code to http status and message
            </ListItem>
            <ListItem>A middleware to cast the error to http-errors</ListItem>
            <Image
              src={images.code_mapping.replace("/", "")}
              margin="20px auto 20px"
              height="400px"
            />
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={2} textColor="secondary">
            Github repo
          </Heading>
          <List>
            <ListItem>https://github.com/xavierchow/service-error</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Thank you</Quote>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
