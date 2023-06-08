import { Link } from "react-router-dom";
import React from "react";
import { Box, Flex, List, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box style={{ position: "sticky", top: 0, zIndex: 1 }} bgColor="blue.600">
      <Flex justify="center" padding="4">
        <List>
          <Link to="/">
            <Text
              color={"white"}
              fontSize="3rem"
              fontWeight={"bold"}
              _hover={{ transform: "scale(1.05)" }}
            >
              Winc Events
            </Text>
          </Link>
        </List>
      </Flex>
    </Box>
  );
};
