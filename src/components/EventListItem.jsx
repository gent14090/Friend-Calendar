import React from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  WrapItem,
  Tag,
  Wrap,
  TagLeftIcon,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const EventListItem = ({ event, categories }) => {
  return (
    <Box maxW={1600} display={"inline-flex"}>
      <Box
        key={event.id}
        width={400}
        background={"white"}
        borderRadius={20}
        boxShadow={"md"}
        margin={4}
      >
        {/* Afbeelding */}
        <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
          <Image
            src={event.image}
            objectFit={"cover"}
            width={"100%"}
            height={250}
            borderTopRadius={20}
          />
        </Link>

        <Box paddingX={4} paddingY={2}>
          {/* Event naam */}
          <Heading
            color={"gray.700"}
            fontSize={"1.7rem"}
            fontWeight={"bold"}
            my={2}
          >
            <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
              {event.title}
            </Link>
          </Heading>

          {/* Starttijd en eindtijd */}
          <Text color={"gray.700"} fontSize={"1rem"} my={2}>
            <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
              🗓️ {new Date(event.startTime).toLocaleString()} {"- "}
              {new Date(event.endTime).toLocaleString()}
            </Link>
          </Text>

          {/* Event locatie */}
          <Text color={"gray.700"} fontSize={"1rem"} my={3}>
            <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
              📍{event.location}
            </Link>
          </Text>

          {/* Event omschrijving */}
          <Text
            color={"gray.500"}
            fontSize={"1rem"}
            fontStyle={"italic"}
            mt={5}
          >
            <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
              {event.description.slice(0, 35)}
              {event.description.length > 35 ? "..." : ""}
            </Link>
          </Text>

          {/* Categorie */}
          <Wrap justify={"left"} spacing={2} mt={5} mb={3}>
            {categories
              .filter((category) => event.categoryIds.includes(category.id))
              .map((category) => (
                <WrapItem key={category.id}>
                  <Tag
                    color={"white"}
                    bgColor={"blue.400"}
                    fontSize={"0.8rem"}
                    fontWeight={"bold"}
                  >
                    <TagLeftIcon as={CalendarIcon} />
                    <Text textTransform={"uppercase"}>{category.name}</Text>
                  </Tag>
                </WrapItem>
              ))}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
};

export default EventListItem;
