import React from "react";
import { GET_CURRENT_USER } from "../../api/users/index";
import { useQuery } from "react-apollo";
import { Heading, Anchor, Header, Nav, Main, Box } from "grommet";

function Home() {
  const { data, loading } = useQuery(GET_CURRENT_USER);

  const items_notauth = [
    { label: "Login", href: "/signin" },
    { label: "Signup", href: "/signup" },
  ];

  const items_auth = [{ label: "Dashboard", href: "/dashboard/me" }, { label: "Logout", href: "/Logout" }];

  if (loading === true && !data) return <div>Loading ... </div>;

  const me = data ? data.me : undefined;
  
  return (
    <>
      <Header background="dark-1" pad="small">
        <Nav direction="row">
          {me ? (
            <>
              {items_auth.map((item) => (
                <Anchor href={item.href} label={item.label} key={item.label} />
              ))}{" "}
            </>
          ) : (
            <>
              {items_notauth.map((item) => (
                <Anchor href={item.href} label={item.label} key={item.label} /> 
              ))}{" "}
            </>
          )}
        </Nav>
      </Header>
      <Main background="dark-1" pad="large">
        <Box
          gap="small"
          direction="column"
          align="center"
          justify="end"
          pad={{ top: "medium", bottom: "small" }}
        >
          <Heading gap="medium" align="center" level="1" size="large">
            We Are Community Lovers
          </Heading>

          <Heading gap="medium" align="center" level="2" size="large">
            An open community platform
          </Heading>
        </Box>
      </Main>
    </>
  );
}
export default Home;
