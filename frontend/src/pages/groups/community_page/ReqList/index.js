import React from "react";
import { useQuery } from "react-apollo";
import { GET_CUMMUNITY_JOIN_REQUEST, GET_COMMUNITY_MEMBERS } from "../../../../api/communitys/index";
import { Heading, Text, Anchor, Header, Box, Button } from "grommet";

export function JoinCommunityRequestList(props) {
  const { data, loading, error } = useQuery(GET_CUMMUNITY_JOIN_REQUEST, {
    variables: { slug: props.slug },
  });

  if (loading && !data) return <div>Loading ... </div>;
  return(
      <>
      { data ? 
        data.getCommunityJoinRequests.map(element=>(
          <div>
            {element.member.email}
          </div>
        ))
        
        : <div>Nothing here to see ...</div>
      }
      </>
  )
}


export function CommunityMemebersList(props) {
  const { data, loading, error } = useQuery(GET_COMMUNITY_MEMBERS, {
    variables: { slug: props.slug },
  });

  if (loading && !data) return <div>Loading ... </div>;
  return(
      <>
      { data ? 
        data.getCommunityMembers.map(element=>(
          <div>
            {element.member.email}
          </div>
        ))
        
        : <div>Nothing here to see ...</div>
      }
      </>
  )
}
