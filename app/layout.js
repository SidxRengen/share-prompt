import "@styles/global.scss";
import Nav from "@components/Nav";
import Provider from "@components/Provider";


export const metadata = {
  title: "Prompto",
  description: "Descover & Share Amazing Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <head>
    <script src="https://kit.fontawesome.com/4a055b32b8.js" crossorigin="anonymous"></script>
    </head>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;