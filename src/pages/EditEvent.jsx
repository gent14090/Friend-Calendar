import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Textarea,
} from "@chakra-ui/react";

const EditEventForm = ({
  event,
  categories,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          value={event.title}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="location" mt={4}>
        <FormLabel>Location</FormLabel>
        <Input
          type="text"
          name="location"
          value={event.location}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="description" isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={event.description}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="startTime" isRequired mt={4}>
        <FormLabel>Start Time</FormLabel>
        <Input
          type="datetime-local"
          name="startTime"
          value={event.startTime}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="endTime" mt={4}>
        <FormLabel>End Time</FormLabel>
        <Input
          type="datetime-local"
          name="endTime"
          value={event.endTime}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="categoryIds" mt={4}>
        <FormLabel>Categories</FormLabel>
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            value={category.id}
            isChecked={event.categoryIds.includes(category.id)}
            onChange={handleCheckboxChange}
          >
            {category.name}
          </Checkbox>
        ))}
      </FormControl>

      <Button type="submit" colorScheme="teal" mt={4}>
        Save
      </Button>
    </form>
  );
};

export default EditEventForm;
