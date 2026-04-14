import { transportCatalog, listAllTransport } from "../data/transportOptions.js";

export const getTransport = async (req, res) => {
  const { category } = req.query;
  if (category === "bike" || category === "bikes") {
    return res.json(transportCatalog.bikes);
  }
  if (category === "car" || category === "cars") {
    return res.json(transportCatalog.cars);
  }
  if (category === "bus" || category === "buses") {
    return res.json(transportCatalog.buses);
  }
  res.json({
    bikes: transportCatalog.bikes,
    cars: transportCatalog.cars,
    buses: transportCatalog.buses,
    all: listAllTransport(),
  });
};
