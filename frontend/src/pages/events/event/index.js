import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GET_CURRENT_EVENT } from "../../../api/events/index";
import {
  Heading,
  Text,
  Anchor,
  Header,
  Nav,
  Main,
  Box,
  Paragraph,
} from "grommet";
import moment from "moment";

const items = [
  { label: "go back to dashboard", href: "/dashboard/me" },
  { label: "Logout ", href: "/logout" },
];

export default function EventPage() {
  const location = useRouteMatch();

  const { data, error, loading } = useQuery(GET_CURRENT_EVENT, {
    variables: { id: location.params.id },
  });

  if (error) return <div> Error</div>;
  if (loading) return <div>Loading ... </div>;
  console.log(data);
  return (
    <>
      <Header background="dark-1" pad="small">
        <Nav direction="row">
          {items.map((item) => (
            <Anchor href={item.href} label={item.label} key={item.label} />
          ))}
        </Nav>
      </Header>

      <Main>
        <Box fill align="center">
          <Header
            background={{
              color: "#CDEAC4",
            }}
            pad={{ bottom: "medium" }}
            direction="column"
            fill
          >
            <Heading level={1} color="white" size="large">
              {data ? data.getCurrentEvent.name : undefined}
            </Heading>

            <Text>
              Owner : {data.getCurrentEvent.eventCreator.owner.firstName}{" "}
              {data.getCurrentEvent.eventCreator.owner.lastName}{" "}
            </Text>
            <Text>
              Community : {data.getCurrentEvent.eventCreator.owner.firstName}{" "}
              {data.getCurrentEvent.eventCreator.community.lastName}{" "}
            </Text>
            <Text>
              created at :{" "}
              {moment(data.getCurrentEvent.createdAt).format("MMM Do YYYY")}{" "}
            </Text>
          </Header>
        </Box>

        <Box width="medium" margin="large" pad="medium">
          <Anchor
            label="Go to community page"
            href={`/communities/${data.getCurrentEvent.eventCreator.community.slug}`}
          />
          <Paragraph textAlign="center">
            {data.getCurrentEvent.description}
          </Paragraph>
        </Box>
      </Main>
    </>
  );
}
