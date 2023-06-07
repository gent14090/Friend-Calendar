import React from "react";
import {
  Box,
  Heading,
  Image,
  Link,
  Text,
  WrapItem,
  Tag,
  Wrap,
} from "@chakra-ui/react";

const EventListItem = ({ event, categories }) => {
  return (
    <Box
      key={event.id}
      maxW={400}
      background={"white"}
      borderRadius={20}
      objectFit={"cover"}
      alignItems={"center"}
      boxShadow="md"
    >
      <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
        {/* Afbeelding */}
        <Image
          src={event.image}
          objectFit={"cover"}
          width={400}
          height={250}
          borderTopRadius={"20px"}
        />

        {/* Event naam */}
        <Heading
          color="gray.800"
          fontSize={"1.7rem"}
          fontWeight={"bold"}
          my="2"
          ml="5"
        >
          {event.title}
        </Heading>

        {/* Starttijd en eindtijd */}
        <Text color="gray.800" fontSize={"1rem"} my="2" ml="5">
          🗓️ {new Date(event.startTime).toLocaleString()} {"– "}
          {new Date(event.endTime).toLocaleString()}
        </Text>

        {/* Event locatie */}
        <Text color="gray.800" fontSize={"1rem"} my="2" ml="5">
          📍{event.location}
        </Text>

        {/* Event omschrijving */}
        <Text
          color="gray.500"
          fontSize={"1rem"}
          fontStyle={"italic"}
          mt="5"
          ml="5"
        >
          {event.description}
        </Text>
      </Link>

      {/* Categorie */}
      <Wrap justify="left" spacing={2} ml="5">
        {categories
          .filter((category) => event.categoryIds.includes(category.id))
          .map((category) => (
            <WrapItem key={category.id}>
              <Tag color="white" fontSize={"0.7rem"} bg="blue.400" my="5">
                <Text textTransform={"uppercase"}>{category.name}</Text>
              </Tag>
            </WrapItem>
          ))}
      </Wrap>
    </Box>
  );
};

export default EventListItem;
