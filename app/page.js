import "@styles/global.css";

export default function Home() {
  return (
    <div>
      <div className="title flex flex-row flex-wrap justify-center mt-2">
        <h1>
          <span>Discover and Share</span>
          <br />
          <span className="grad1 flex justify-center">AI-Powered</span>
          <br />
          <span className="grad1 flex justify-center">Prompts</span>
        </h1>
      </div>
      <div className="discription flex flex-row justify-center mt-3">
        <p><span className="grad1">Prompto</span> is an open source AI prompting tool for modern world to
        <span className="grad1"> Discover, Create, Save and Share creative prompts</span>
        </p>
      </div>
    </div>
  );
}
