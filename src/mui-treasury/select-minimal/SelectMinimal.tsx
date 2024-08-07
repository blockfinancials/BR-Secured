import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepPurple } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import { menuClasses } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select, { selectClasses } from "@mui/material/Select";
import { Typography } from "@mui/material";

export function SelectMinimal({ value, onChange, menuItems }) {
  return (
    <FormControl>
      <Select
        disableUnderline
        variant="standard"
        displayEmpty
        defaultValue=""
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography style={{ color: "white" }}>Select Chain</Typography>
            );
          }
          return selected;
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          sx: {
            marginBlock: "0.5rem",
            [`& .${menuClasses.paper}`]: {
              borderRadius: "12px",
              backgroundColor: "white",
            },
            [`& .${menuClasses.list}`]: {
              paddingTop: 0,
              paddingBottom: 0,
              background: "white",
              "& li": {
                paddingTop: "12px",
                paddingBottom: "12px",
                color: deepPurple[500], // Text color for menu items
              },
              "& li:hover": {
                background: deepPurple[50],
              },
              "& li.Mui-selected": {
                color: "white",
                background: deepPurple[400],
              },
              "& li.Mui-selected:hover": {
                background: deepPurple[500],
              },
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: deepPurple[200],
                borderRadius: "2px",
              },
            },
          },
        }}
        IconComponent={ExpandMoreIcon}
        value={value}
        onChange={onChange}
        sx={{
          minWidth: 200,
          [`& .${selectClasses.select}`]: {
            background: "transparent",
            color: "white",
            borderRadius: "22px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "14px",
            paddingBottom: "15px",
            boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
            border: "1px solid white", // Added white border
            "&:focus": {
              borderRadius: "12px",
              background: "transparent",
              borderColor: "white",
            },
          },
          [`& .${selectClasses.icon}`]: {
            right: "12px",
            color: "white",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
