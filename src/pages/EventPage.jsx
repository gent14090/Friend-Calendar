import React, { useState } from "react";
import {
  Heading,
  Box,
  Text,
  Image,
  Flex,
  Tag,
  Center,
  TagLeftIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useLoaderData, useNavigate } from "react-router-dom";
import { CalendarIcon } from "@chakra-ui/icons";
import EditEventForm from "../components/EditEvent";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { onClose } = useDisclosure();
  const { users, event, categories } = useLoaderData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setUpdatedEvent((prevState) => ({
        ...prevState,
        categoryIds: [...prevState.categoryIds, Number(value)],
      }));
    } else {
      setUpdatedEvent((prevState) => ({
        ...prevState,
        categoryIds: prevState.categoryIds.filter((id) => id !== Number(value)),
      }));
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast({
          title: "Event Edited Successfully.",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
          onCloseComplete: () => {
            onClose();
            window.location.reload();
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Something went wrong. Please try again.",
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
          onCloseComplete: () => {
            onClose();
            window.location.reload();
          },
        });
      });
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Do you want to delete this event?")) {
      window.confirm("Are you sure?");
      fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast({
            title: "Event deleted successfully.",
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Something went wrong. Please try again.",
            status: "error",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        });
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Center backgroundColor={"gray.50"}>
      <Box
        maxW={1200}
        width={"60%"}
        display={"flex"}
        flexDirection={"column"}
        my={"6"}
      >
        {/* Go Back knop */}
        <Button
          leftIcon={<ArrowBackIcon />}
          color={"gray.500"}
          backgroundColor={"transparent"}
          fontWeight={"regular"}
          fontSize={"0.8rem"}
          onClick={handleGoBack}
          _hover={{ color: "blue.500" }}
          justifyContent={"left"}
        >
          GO BACK
        </Button>

        <Box background={"white"} borderRadius={20} boxShadow={"md"}>
          {/* Afbeelding */}
          <Image
            src={event.image}
            objectFit={"cover"}
            width={"100%"}
            height={350}
            borderTopRadius={"20px"}
          />

          {/* Event naam */}
          <Heading
            fontSize={"2rem"}
            color={"gray.700"}
            mt={"6"}
            mb={"2"}
            ml={"4"}
          >
            {event.title}
          </Heading>

          {/* Categorie */}
          <Flex gap={2} my={"2"} ml={"4"}>
            {categories
              .filter((category) => event.categoryIds.includes(category.id))
              .map((category) => (
                <Box key={category.id}>
                  <Tag
                    color="white"
                    bgColor={"blue.400"}
                    fontSize="0.8rem"
                    fontWeight={"bold"}
                  >
                    <TagLeftIcon as={CalendarIcon} />
                    <Text textTransform={"uppercase"} fontSize={"10"}>
                      {category.name}
                    </Text>
                  </Tag>
                </Box>
              ))}
          </Flex>

          <Divider my={"5"}></Divider>

          {/* Locatie */}
          <Text color={"gray.700"} fontSize={"1rem"} my={"2"} mx={"4"}>
            📍{event.location}
          </Text>

          {/* Begintijd en eindtijd */}
          <Text color={"gray.700"} fontSize={"1rem"} my={"2"} mx={"4"}>
            🗓️ {new Date(event.startTime).toLocaleString()} {"– "}
            {new Date(event.endTime).toLocaleString()}
          </Text>

          {/* Omschrijving */}
          <Text color={"gray.500"} fontSize={"1rem"} my={"2"} mx={"4"}>
            {event.description}
          </Text>

          {/* Profielfoto */}
          <Image
            src={users.find((user) => user.id === event.createdBy)?.image}
            borderRadius={"50px"}
            height={"50px"}
            mt={"6"}
            mx={"4"}
          />

          {/* Auteur */}
          <Text color="gray.500" fontSize="0.8rem" mt="1" mx={"4"}>
            Organizer: {users.find((user) => user.id === event.createdBy)?.name}
          </Text>

          <Divider my={"5"}></Divider>

          {/* Knop edit event */}
          <Flex gap={3} mt={"10"} mb={"6"} mx={"4"}>
            <Button
              color={"white"}
              backgroundColor={"green.400"}
              onClick={() => setIsEditModalOpen(true)}
              _hover={{ bg: "green" }}
            >
              Edit Event
            </Button>
            {/* Knop delete event */}
            <Button
              color={"white"}
              backgroundColor={"red.400"}
              onClick={handleDeleteClick}
              _hover={{ bg: "red" }}
            >
              Delete Event
            </Button>
          </Flex>

          {/* Edit event modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditEventForm
                  event={updatedEvent}
                  categories={categories}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSubmit={handleEditSubmit}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Center>
  );
};

export default EventPage;
