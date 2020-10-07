import React from "react";
//import queryString from "query-string"
import { useRouteMatch } from "react-router-dom";
import EventCreationForm from "../../../components/forms/eventCreationForm/index";
import { GET_CURRENT_COMMUNITY_BY_SLUG, ADD_COMMUNITY_JOIN_REQUEST } from "../../../api/communitys/index";

import { useQuery, useMutation } from "react-apollo";
import {
  Heading,
  Text,
  Anchor,
  Header,
  Nav,
  Main,
  Box,
  Tabs,
  Tab,
  Button,
} from "grommet";

import CommunityEventsList from "./eventsList/index";
import moment from "moment";

const items = [
  { label: "go back to dashboard", href: "/dashboard/me" },
  { label: "Logout ", href: "/logout" },
];

export default function CommunityPage() {
  const location = useRouteMatch();
  
  const [addJoinReq, {data:join_data, loading:join_loading}] = useMutation(ADD_COMMUNITY_JOIN_REQUEST)

  const { data, loading, error } = useQuery(GET_CURRENT_COMMUNITY_BY_SLUG, {
    variables: { slug: location.params.slug },
  });

  let handleJoinCommunity = async (event)=>{
    await 
     console.log(addJoinReq(
       {
         variables: {
           community : Number(data.getCommunitysBySlug.community.id)
         }
       }
     )
    )
     
  }

  if (error) console.log(error);

  if (loading) return <div>Loading</div>;

  const is_owner =
    data.getCommunitysBySlug.owner.email === localStorage.getItem("user_email");
   
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
            <Heading level={1} color="white" size="large" width="100vw">
              {data ? data.getCommunitysBySlug.community.name : undefined}
            </Heading>

            <Text>
              Owner : {data.getCommunitysBySlug.owner.firstName}{" "}
              {data.getCommunitysBySlug.owner.lastName}
            </Text>
            <Text>
              created at :{" "}
              {moment(data.getCommunitysBySlug.community.createdAt).format(
                "MMM Do YYYY"
              )}{" "}
            </Text>
            {!is_owner ?
            <Button
              primary
              color="dark-1"
              label="join this community"
              onClick={handleJoinCommunity}
              type="button"
            ></Button>: "" }
          </Header>
          <Box width="medium">
            <Tabs>
              <Tab title="Events">
                <CommunityEventsList community_slug={location.params.slug} />
              </Tab>
              <Tab title="Members">
                <Box pad="medium">Two</Box>
              </Tab>
              {is_owner ? (
                <Tab title="add Events">
                  <Box pad="medium">
                    <EventCreationForm
                      current_user={data.getCommunitysBySlug.id}
                    />
                  </Box>
                </Tab>
              ) : undefined}
            </Tabs>
          </Box>
        </Box>
      </Main>
    </>
  );
}
