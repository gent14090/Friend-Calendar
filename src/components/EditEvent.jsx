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
      {/* Event naam veranderen */}
      <FormControl id="title" isRequired>
        <FormLabel>Event name</FormLabel>
        <Input
          type="text"
          name="title"
          value={event.title}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Event locatie veranderen */}
      <FormControl id="location" mt={4}>
        <FormLabel>Location</FormLabel>
        <Input
          type="text"
          name="location"
          value={event.location}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Event omschrijving veranderen */}
      <FormControl id="description" isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={event.description}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Startdatum en -tijd veranderen */}
      <FormControl id="startTime" isRequired mt={4}>
        <FormLabel>Starts at:</FormLabel>
        <Input
          type="datetime-local"
          name="startTime"
          value={event.startTime}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Einddatum en -tijd veranderen */}
      <FormControl id="endTime" mt={4}>
        <FormLabel>Ends at:</FormLabel>
        <Input
          type="datetime-local"
          name="endTime"
          value={event.endTime}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Event type veranderen (categorieen) */}
      <FormControl id="categoryIds" mt={4}>
        <FormLabel>Event type</FormLabel>
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

      {/* Veranderingen opslaan */}
      <Button type="submit" colorScheme="green" my={4}>
        Save changes
      </Button>
    </form>
  );
};

export default EditEventForm;
