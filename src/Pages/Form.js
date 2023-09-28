import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectData, setSelectedDevice, setSelectedItem, setSelectedGroup, setSelectedContainer, setSelectedTruck } from "../Features/Slice";

const ProjectData = () => {
  const dispatch = useDispatch();
  const [selectedDeviceTitle, setSelectedDeviceTitle] = useState("Select a Device");
  const ProjectData = useSelector((state) => state.projectData);
  const selectedDevice = useSelector((state) => state.selectedDevice);
  const selectedItem = useSelector((state) => state.selectedItem);
  const selectedGroup = useSelector((state) => state.selectedGroup);
  const selectedContainer = useSelector((state) => state.selectedContainer);
  const selectedTruck = useSelector((state) => state.selectedTruck);

  useEffect(() => {
    dispatch(fetchProjectData());
  }, [selectedDevice]);

  const handleDeviceChange = (event) => {
    const selectedDeviceID = event.target.value;
    const selectedDeviceData = ProjectData.find((selection) =>
      selection.devices.some((device) => device.deviceID === selectedDeviceID)
    );

    dispatch(setSelectedDevice(selectedDeviceID));
    setSelectedDeviceTitle(selectedDeviceID);

    // Find the corresponding item, group, container, and truck based on the selected device
    if (selectedDeviceData) {
      const selectedItemData = selectedDeviceData.items[0];
      const selectedGroupData = selectedDeviceData.groups[0];
      const selectedContainerData = selectedDeviceData.containers[0];
      const selectedTruckData = selectedDeviceData.trucks[0];

      dispatch(setSelectedItem(selectedItemData ? selectedItemData.itemID : "Select an Item"));
      dispatch(setSelectedGroup(selectedGroupData ? selectedGroupData.groupID : "Select a Group"));
      dispatch(setSelectedContainer(selectedContainerData ? selectedContainerData.containerID : "Select a Container"));
      dispatch(setSelectedTruck(selectedTruckData ? selectedTruckData.truckID : "Select a Truck"));
    } else {
      dispatch(setSelectedItem("Select an Item"));
      dispatch(setSelectedGroup("Select a Group"));
      dispatch(setSelectedContainer("Select a Container"));
      dispatch(setSelectedTruck("Select a Truck"));
    }
  };

  return (
    <div className="container">
      <div className="container whole-container">
        <Form>
          {/* Device Select */}
          <div className="row">
            <div className="col-md-4">
              <Form.Group controlId="selectDevice">
                <Form.Label>Devices :</Form.Label>
              </Form.Group>
            </div>
            <div className="col-md-8">
              <Form.Group>
                <Form.Control
                  as="select"
                  value={selectedDevice}
                  onChange={handleDeviceChange}
                  style={{ width: "500px" }}
                >
                  <option value="">Select a Device</option>
                  {ProjectData
                    ? ProjectData.flatMap((selection) => selection.devices).map(
                        (device) => (
                          <option key={device.id} value={device.deviceID}>
                            {device.deviceID}
                          </option>
                        )
                      )
                    : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {/* Item Select */}
          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Group controlId="selectItem">
                <Form.Label>Items :</Form.Label>
              </Form.Group>
            </div>
            <div className="col-md-8">
              <Form.Group>
                <Form.Control
                  as="select"
                  value={selectedItem}
                  onChange={(event) => dispatch(setSelectedItem(event.target.value))}
                  style={{ width: "500px" }}
                >
                  <option value="">Select an Item</option>
                  {ProjectData
                    ? ProjectData.flatMap((selection) => selection.items).map(
                        (item) => (
                          <option key={item.id} value={item.itemID}>
                            {item.itemID}
                          </option>
                        )
                      )
                    : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {/* Group Select */}
          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Group controlId="selectGroup">
                <Form.Label>Groups :</Form.Label>
              </Form.Group>
            </div>
            <div className="col-md-8">
              <Form.Group>
                <Form.Control
                  as="select"
                  value={selectedGroup}
                  onChange={(event) => dispatch(setSelectedGroup(event.target.value))}
                  style={{ width: "500px" }}
                >
                  <option value="">Select a Group</option>
                  {ProjectData
                    ? ProjectData.flatMap((selection) => selection.groups).map(
                        (group) => (
                          <option key={group.id} value={group.groupID}>
                            {group.groupID}
                          </option>
                        )
                      )
                    : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {/* Container Select */}
          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Group controlId="selectContainer">
                <Form.Label>Container :</Form.Label>
              </Form.Group>
            </div>
            <div className="col-md-8">
              <Form.Group>
                <Form.Control
                  as="select"
                  value={selectedContainer}
                  onChange={(event) => dispatch(setSelectedContainer(event.target.value))}
                  style={{ width: "500px" }}
                >
                  <option value="">Select a Container</option>
                  {ProjectData
                    ? ProjectData.flatMap(
                        (selection) => selection.containers
                      ).map((container) => (
                        <option
                          key={container.id}
                          value={container.containerID}
                        >
                          {container.containerID}
                        </option>
                      ))
                    : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          {/* Truck Select */}
          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Group controlId="selectTruck">
                <Form.Label>Trucks :</Form.Label>
              </Form.Group>
            </div>
            <div className="col-md-8">
              <Form.Group>
                <Form.Control
                  as="select"
                  value={selectedTruck}
                  onChange={(event) => dispatch(setSelectedTruck(event.target.value))}
                  style={{ width: "500px" }}
                >
                  <option value="">Select a Truck</option>
                  {ProjectData
                    ? ProjectData.flatMap((selection) => selection.trucks).map(
                        (truck) => (
                          <option key={truck.id} value={truck.truckID}>
                            {truck.truckID}
                          </option>
                        )
                      )
                    : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProjectData;
