import Routes from "./routes";
import Nav from "./nav";
import Footer from "./footer";

// Page component to display the navigation, content, and footer
export default function Page() {
  // Style for the page
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  // Style for the content
  const contentStyle = {
    flex: 1,
  };

  // Return the page layout
  return (
    <div style={pageStyle}>
      <Nav />
      <div style={contentStyle}>
        <Routes />
      </div>
      <Footer />
    </div>
  );
}
