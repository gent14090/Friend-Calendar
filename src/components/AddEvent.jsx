import React, { useState } from "react";
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  Center,
  Divider,
  Checkbox,
} from "@chakra-ui/react";

export const AddEvent = () => {
  const { isOpen, onOpen, onClose, reset } = useDisclosure();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const toast = useToast();

  const categories = [
    {
      name: "Food",
      id: 1,
    },
    {
      name: "Sport",
      id: 2,
    },
    {
      name: "Party",
      id: 3,
    },
    {
      name: "Other",
      id: 4,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedCategories = categories.filter((category) =>
      categoryIds.includes(category.id)
    );
    const attendedBy = [];
    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        image,
        categoryIds: selectedCategories.map((category) => category.id),
        attendedBy,
        location,
        startTime,
        endTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    toast({
      title: "Event Added Successfully.",
      status: "success",
      duration: 3000,
      position: "top-right",
      isClosable: true,
      onCloseComplete: () => {
        onClose();
        window.location.reload();
      },
    });
    onClose();
    reset();
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategoryIds((prevIds) => [...prevIds, Number(value)]);
    } else {
      setCategoryIds((prevIds) => prevIds.filter((id) => id !== Number(value)));
    }
  };

  return (
    <Box p={"6"}>
      <Center>
        <Heading
          color={"gray.700"}
          fontSize={"2rem"}
          fontWeight={"bold"}
          my={3}
        >
          Add your event to the calendar
        </Heading>
      </Center>
      <Center>
        <Button
          onClick={onOpen}
          my={4}
          color="white"
          backgroundColor={"green.400"}
          _hover={{
            bgColor: "green",
          }}
        >
          Add Event
        </Button>
      </Center>
      <Divider my={8}></Divider>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  value={image}
                  placeholder={"Insert link.."}
                  onChange={(event) => setImage(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Location</FormLabel>
                <Input
                  placeholder="Location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  placeholder="Description.."
                  onChange={(event) => setDescription(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Event type</FormLabel>
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    value={category.id}
                    isChecked={categoryIds.includes(category.id)}
                    onChange={handleCheckboxChange}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </FormControl>
              <Button
                variant="outline"
                mt={8}
                type="submit"
                _hover={{ bg: "limegreen", color: "white" }}
              >
                Save
              </Button>
              <Button
                variant="outline"
                ml={4}
                mt={8}
                _hover={{ bg: "red", color: "white" }}
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
