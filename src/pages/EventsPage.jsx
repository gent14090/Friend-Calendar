import React, { useState } from "react";
import {
  Box,
  Center,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { AddEvent } from "../components/AddEvent";
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
    <Center>
      {/* Zoekbalk */}
      <Box p={"6"} bgColor={"gray.50"}>
        <Box>
          <Input
            borderColor={"gray.400"}
            placeholder={"Search events..."}
            value={search}
            onChange={handleChange}
          />

          {/* Filters */}
          <RadioGroup
            padding={"4"}
            marginBottom={"6"}
            color={"gray.500"}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <Flex gap={"2"}>
              <Text>Event type:</Text>
              <Radio value={"all"} _checked={{ bg: "gray.500" }}>
                All
              </Radio>
              {categories.map((category) => (
                <Radio
                  key={category.id}
                  value={category.id.toString()}
                  _checked={{ bg: "gray.500" }}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        </Box>

        {filteredEvents.map((event) => (
          <EventListItem key={event.id} event={event} categories={categories} />
        ))}

        <Divider my={"5"}></Divider>

        <AddEvent />
      </Box>
    </Center>
  );
};

export { loader, EventsPage };
