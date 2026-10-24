import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import ServiceCard from "./ServiceCard";
import { Button, Divider, Modal } from "@mui/material";
import {
  Label,
  RemoveShoppingCart,
  Shop,
  ShoppingCart,
} from "@mui/icons-material";
import SelectedServiceList from "./SelectedServiceList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesBySalonId } from "../../../Redux/Salon Services/action";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createBooking } from "../../../Redux/Booking/action";

const SalonServiceDetails = () => {
  const { id } = useParams(); // Assuming id is passed as a parameter in the URL which is given in route path '/salon/:id'
  const dispatch = useDispatch();
  const { salon, salonService, category } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
  };
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const [selectedServices, setSelectedServices] = useState({
    services: [],
    time: null,
  });

  const handleSelectServices = (service) => {
    setSelectedServices((prevState) => ({
      ...prevState,
      services: [...prevState.services, service],
    }));
  };

  const handleRemoveServices = (id) => {
    setSelectedServices((prevState) => ({
      ...prevState,
      services: prevState.services.filter((service) => service.id !== id),
    }));
  };
  useEffect(() => {
    dispatch(
      fetchServicesBySalonId({
        salonId: id,
        jwt: localStorage.getItem("jwt"),
        categoryId: selectedCategory,
      })
    );
  }, [id, selectedCategory]);

  const handleBooking = () => {
    const serviceIds = selectedServices.services.map((service) => service.id);

    dispatch(createBooking({
      jwt: localStorage.getItem("jwt"),
      salonId:id,
      bookingData: {
        serviceIds,
        startTime : selectedServices.time
      }
    }))
  };

  return (
    <div className="lg:flex gap-5 h-[90vh] mt-10">
      <section className="space-y-5 border-r lg:w-[25%] pr-5">
        {category.categories.map((item, index) => (
          <CategoryCard
            item={item}
            selectedCategory={selectedCategory}
            key={index}
            handleCategoryClick={() => {
              handleCategoryClick(item);
            }}
          />
        ))}
      </section>
      <section className="space-y-2 lg:w-[50%] px-5 lg:px-20 overflow-y-auto">
        {salonService.services.map((item, index) => (
          <div className="space-y-4">
            <ServiceCard
              onSelect={handleSelectServices}
              onRemove={handleRemoveServices}
              item={item}
            />
            <Divider />
          </div>
        ))}
      </section>
      <section className="lg:w-[25%]">
        <div className="border rounded-md p-5">
          {true ? (
            <div>
              <div className="flex items-center gap-2">
                <ShoppingCart sx={{ fontSize: "30px", color: "green" }} />
                <h1 className="font-normal ">Selected Services</h1>
              </div>
              <SelectedServiceList
                selectedServices={selectedServices.services}
                onRemove={handleRemoveServices}
              />
              <Button
                onClick={handleModalOpen}
                fullWidth
                variant="contained"
                sx={{ py: ".7rem" }}
              >
                Book Now
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center">
              <RemoveShoppingCart sx={{ fontSize: "30px", color: "green" }} />
              <h1 className="font-semibold text-xl">No services selected</h1>
            </div>
          )}
        </div>
      </section>
      <Modal open={open} onClose={handleModalClose}>
        <div className="absolute top-1/2 left-1/2 p-4 transform -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] bg-gray-500 shadow-lg lg:flex gap-5">
          <div className="w-[50%] border-r pr-5 flex itec">
            <h1 className="text-xl font-semibold text-center ">
              Time Slots Not Available
            </h1>
          </div>
          <div>
            <SelectedServiceList
              onRemove={handleRemoveServices}
              selectedServices={selectedServices.services}
            />
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ width: "100%" }}
                fullWidth
                onChange={(value) => {
                  if (value) {
                    const localDateTime = value.format("YYYY-MM-DDTHH:mm:ss");
                    setSelectedServices((prevState) => ({
                      ...prevState,
                      time: localDateTime,
                    }));
                  }
                }}
                label="Select Time and Date"
              />
            </LocalizationProvider>
            <div>
              <Button
                fullWidth
                variant="contained"
                sx={{ fontSize: "1.3rem", marginTop: "20px" }}
                onClick={handleBooking}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalonServiceDetails;
