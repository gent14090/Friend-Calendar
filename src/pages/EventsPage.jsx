import React, { useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { AddEvent } from "./AddEvent";
import EventListItem from "../components/EventListItem";

const loader = async () => {
  const [eventsResponse, categoriesResponse] = await Promise.all([
    fetch("http://localhost:3000/events"),
    fetch("http://localhost:3000/categories"),
  ]);

  const [events, categories] = await Promise.all([
    eventsResponse.json(),
    categoriesResponse.json(),
  ]);

  return { events, categories };
};

const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const filteredEvents = events
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .filter((event) => {
      if (selectedCategory === "all") {
        return true;
      }
      return event.categoryIds.includes(parseInt(selectedCategory));
    });

  return (
    <Box p="6" maxWidth={{ base: "100%", md: "680px" }} mx="auto">
      <Heading as="h1" size="xl" mb="6">
        Winc Events
      </Heading>
      <Center>
        <Box mb={"60px"} mt={"30px"}>
          <Input
            bgGradient="linear(to-r, rgba(26, 32, 44, 0.6), rgba(26, 32, 44, 0.90))"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            borderColor={"gray.400"}
            placeholder={"Search Events.."}
            _placeholder={{ color: "gray.400" }}
            value={search}
            color={"white"}
            onChange={handleChange}
          />
          <RadioGroup
            bgGradient="linear(to-r, rgba(16, 28, 37, 0.6), rgba(12, 19, 28, 0.85))"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            borderColor={"gray.400"}
            padding={4}
            marginTop={6}
            marginBottom={6}
            color="gray.400"
            borderRadius={25}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <Stack>
              <Flex gap={2}>
                <Text>Filter:</Text>
                <Radio
                  fontWeight={700}
                  value="all"
                  _checked={{ bg: "white", color: "#1A202C" }}
                  _focus={{ boxShadow: "none" }}
                >
                  All
                </Radio>
                {categories.map((category) => (
                  <Radio
                    key={category.id}
                    value={category.id.toString()}
                    _checked={{ bg: "white", color: "#1A202C" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </Radio>
                ))}
              </Flex>
            </Stack>
          </RadioGroup>
        </Box>
      </Center>
      <List spacing="6">
        {filteredEvents.map((event) => (
          <EventListItem key={event.id} event={event} categories={categories} />
        ))}
        <AddEvent />
        <ListItem borderBottomWidth="1px" borderColor="gray.200"></ListItem>
      </List>
    </Box>
  );
};

export { loader, EventsPage };
