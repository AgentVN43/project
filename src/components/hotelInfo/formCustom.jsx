import {
  Alert,
  Button,
  Card,
  Form,
  InputNumber,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
const { Title, Text } = Typography;
const { Option } = Select;

const FormCustom = ({ totalGuests, setInfoTraveler }) => {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);



  // const ROOM_TYPES = [
  //   { id: 1, name: "Phòng đơn", capacity: 1 },
  //   { id: 2, name: "Phòng hai", capacity: 2 },
  //   { id: 3, name: "Phòng ba", capacity: 3 },
  // ];

  // const findOptimalRooms = (values) => {
  //   const { totalGuests, rooms } = values;

  //   if (!totalGuests) {
  //     return { error: "Please enter total guests" };
  //   }

  //   // Calculate total allocated guests from selected rooms
  //   let allocatedGuests = 0;
  //   let distribution = [];

  //   // Process selected rooms
  //   for (const roomType of ROOM_TYPES) {
  //     const roomCount = rooms[`type${roomType.id}`] || 0;
  //     if (roomCount > 0) {
  //       const guestsInRooms = roomType.capacity * roomCount;
  //       allocatedGuests += guestsInRooms;
  //       distribution.push({
  //         ...roomType,
  //         count: roomCount,
  //         totalCapacity: guestsInRooms,
  //       });
  //     }
  //   }

  //   let remainingGuests = totalGuests - allocatedGuests;

  //   // Validate if selected rooms don't exceed total guests
  //   if (allocatedGuests > totalGuests) {
  //     return { error: "Selected rooms exceed total guests capacity" };
  //   }

  //   // If there are remaining guests, allocate them optimally
  //   if (remainingGuests > 0) {
  //     // Get room types that weren't fully allocated
  //     const selectedRoomIds = distribution.map((room) => room.id);
  //     const availableRoomTypes = ROOM_TYPES.filter(
  //       (room) => !selectedRoomIds.includes(room.id)
  //     ).sort((a, b) => b.capacity - a.capacity);

  //     // First try to fill with largest available room type
  //     for (const roomType of availableRoomTypes) {
  //       const roomCount = Math.floor(remainingGuests / roomType.capacity);
  //       if (roomCount > 0) {
  //         const allocatedGuests = roomCount * roomType.capacity;
  //         distribution.push({
  //           ...roomType,
  //           count: roomCount,
  //           totalCapacity: allocatedGuests,
  //         });
  //         remainingGuests -= allocatedGuests;
  //       }
  //     }

  //     // If there are still remaining guests, use the smallest available room
  //     if (remainingGuests > 0) {
  //       const smallestRoom = availableRoomTypes[availableRoomTypes.length - 1];
  //       if (smallestRoom) {
  //         const extraRooms = Math.ceil(remainingGuests / smallestRoom.capacity);
  //         const existingRoom = distribution.find(
  //           (room) => room.id === smallestRoom.id
  //         );

  //         if (existingRoom) {
  //           existingRoom.count += extraRooms;
  //           existingRoom.totalCapacity += remainingGuests;
  //         } else {
  //           distribution.push({
  //             ...smallestRoom,
  //             count: extraRooms,
  //             totalCapacity: remainingGuests,
  //           });
  //         }
  //       }
  //     }
  //   }

  //   // Sort distribution by room type ID for consistent display
  //   distribution.sort((a, b) => a.id - b.id);

  //   // Calculate totals
  //   const totalRooms = distribution.reduce((sum, room) => sum + room.count, 0);
  //   const totalCapacity = distribution.reduce(
  //     (sum, room) => sum + room.totalCapacity,
  //     0
  //   );

  //   return {
  //     totalGuests,
  //     distribution,
  //     totalRooms,
  //     totalCapacity,
  //   };
  // };

  const ROOM_TYPES = [
    { id: 1, name: "Phòng đơn", capacity: 1 },
    { id: 2, name: "Phòng hai", capacity: 2, hidden: true },
    { id: 3, name: "Phòng ba", capacity: 3 },
  ];

  // const findOptimalRooms = (values) => {
  //   const { rooms } = values;

  //   if (!totalGuests) {
  //     return { error: "Please enter total guests" };
  //   }

  //   let allocatedGuests = 0;
  //   let distribution = [];

  //   // Determine if type1 and type3 rooms are input
  //   const hasType1Input = rooms?.type1 > 0;
  //   const hasType3Input = rooms?.type3 > 0;

  //   // Process already selected rooms
  //   for (const roomType of ROOM_TYPES) {
  //     if (roomType.hidden) continue; // Skip hidden room type

  //     const roomCount = rooms?.[`type${roomType.id}`] || 0;
  //     if (roomCount > 0) {
  //       const guestsInRooms = roomType.capacity * roomCount;
  //       allocatedGuests += guestsInRooms;
  //       distribution.push({
  //         ...roomType,
  //         count: roomCount,
  //         totalCapacity: guestsInRooms,
  //       });
  //     }
  //   }

  //   let remainingGuests = totalGuests - allocatedGuests;

  //   // If no type1 and type3 rooms are input, prioritize type2 rooms
  //   if (!hasType1Input && !hasType3Input) {
  //     const type2 = ROOM_TYPES.find((room) => room.id === 2);
  //     const type2Rooms = Math.floor(remainingGuests / type2.capacity);
  //     const allocated = type2Rooms * type2.capacity;

  //     if (type2Rooms > 0) {
  //       distribution.push({
  //         ...type2,
  //         count: type2Rooms,
  //         totalCapacity: allocated,
  //       });

  //       remainingGuests -= allocated;
  //     }
  //   }

  //   // If there are still remaining guests, allocate optimally with other room types
  //   if (remainingGuests > 0) {
  //     // Prioritize rooms based on capacity, avoiding type2 if possible
  //     const availableRoomTypes = ROOM_TYPES.filter(
  //       (room) => !room.hidden && room.id !== 2
  //     ).sort((a, b) => b.capacity - a.capacity);

  //     const optimalRoomTypes = [...availableRoomTypes];

  //     // If no type1 or type3 rooms were input, add type2
  //     if (!hasType1Input && !hasType3Input) {
  //       const type2 = ROOM_TYPES.find((room) => room.id === 2);
  //       optimalRoomTypes.push(type2);
  //     }

  //     for (const roomType of optimalRoomTypes) {
  //       if (remainingGuests <= 0) break;

  //       const roomCount = Math.floor(remainingGuests / roomType.capacity);
  //       if (roomCount > 0) {
  //         const allocated = roomCount * roomType.capacity;

  //         distribution.push({
  //           ...roomType,
  //           count: roomCount,
  //           totalCapacity: allocated,
  //         });

  //         remainingGuests -= allocated;
  //       }
  //     }

  //     // Handle any remaining guests with the smallest room type
  //     if (remainingGuests > 0) {
  //       const smallestRoom = ROOM_TYPES.find((room) => room.id === 1);
  //       distribution.push({
  //         ...smallestRoom,
  //         count: 1,
  //         totalCapacity: remainingGuests,
  //       });
  //     }
  //   }

  //   // Sort distribution by room type ID for consistent display
  //   distribution.sort((a, b) => a.id - b.id);

  //   // Calculate totals
  //   const totalRooms = distribution.reduce((sum, room) => sum + room.count, 0);
  //   const totalCapacity = distribution.reduce(
  //     (sum, room) => sum + room.totalCapacity,
  //     0
  //   );

  //   return {
  //     totalGuests,
  //     distribution,
  //     totalRooms,
  //     totalCapacity,
  //   };
  // };

  const findOptimalRooms = (values) => {
    

    const { rooms } = values;

    if (totalGuests === 0) {
      return { error: "No guests found" };
    }

    let allocatedGuests = 0;
    let distribution = [];

    const ROOM_TYPES = [
      { id: 1, name: "Phòng đơn", capacity: 1 },
      { id: 2, name: "Phòng hai", capacity: 2, hidden: true },
      { id: 3, name: "Phòng ba", capacity: 3 },
    ];

    // Determine if type1 and type3 rooms are input
    const hasType1Input = rooms?.type1 > 0;
    const hasType3Input = rooms?.type3 > 0;

    // Process already selected rooms
    for (const roomType of ROOM_TYPES) {
      if (roomType.hidden) continue; // Skip hidden room type

      const roomCount = rooms?.[`type${roomType.id}`] || 0;
      if (roomCount > 0) {
        const guestsInRooms = roomType.capacity * roomCount;
        allocatedGuests += guestsInRooms;
        distribution.push({
          ...roomType,
          count: roomCount,
          totalCapacity: guestsInRooms,
        });
      }
    }

    let remainingGuests = totalGuests - allocatedGuests;

    // If no type1 and type3 rooms are input, prioritize type2 rooms
    if (!hasType1Input && !hasType3Input) {
      const type2 = ROOM_TYPES.find((room) => room.id === 2);
      const type2Rooms = Math.floor(remainingGuests / type2.capacity);
      const allocated = type2Rooms * type2.capacity;

      if (type2Rooms > 0) {
        distribution.push({
          ...type2,
          count: type2Rooms,
          totalCapacity: allocated,
        });

        remainingGuests -= allocated;
      }
    }

    // If there are still remaining guests, allocate optimally with other room types
    if (remainingGuests > 0) {
      // Prioritize rooms based on capacity, avoiding type2 if possible
      const availableRoomTypes = ROOM_TYPES.filter(
        (room) => !room.hidden && room.id !== 2
      ).sort((a, b) => b.capacity - a.capacity);

      const optimalRoomTypes = [...availableRoomTypes];

      // If no type1 or type3 rooms were input, add type2
      if (!hasType1Input && !hasType3Input) {
        const type2 = ROOM_TYPES.find((room) => room.id === 2);
        optimalRoomTypes.push(type2);
      }

      for (const roomType of optimalRoomTypes) {
        if (remainingGuests <= 0) break;

        const roomCount = Math.floor(remainingGuests / roomType.capacity);
        if (roomCount > 0) {
          const allocated = roomCount * roomType.capacity;

          distribution.push({
            ...roomType,
            count: roomCount,
            totalCapacity: allocated,
          });

          remainingGuests -= allocated;
        }
      }

      // Handle any remaining guests with the smallest room type
      if (remainingGuests > 0) {
        const smallestRoom = ROOM_TYPES.find((room) => room.id === 1);
        distribution.push({
          ...smallestRoom,
          count: 1,
          totalCapacity: remainingGuests,
        });
      }
    }

    // Sort distribution by room type ID for consistent display
    distribution.sort((a, b) => a.id - b.id);

    // Calculate totals
    const totalRooms = distribution.reduce((sum, room) => sum + room.count, 0);
    const totalCapacity = distribution.reduce(
      (sum, room) => sum + room.totalCapacity,
      0
    );

    return {
      totalGuests,
      distribution,
      totalRooms,
      totalCapacity,
    };
  };

  const handleCalculate = (values) => {
    const result = findOptimalRooms(values);
    setResult(result);
  };

  const handleConfirm = () => {
    const hotelData = {
      totalGuests: result.totalGuests,
      totalRooms: result.totalRooms,
      totalCapacity: result.totalCapacity,
      utilization:
        ((result.totalGuests / result.totalCapacity) * 100).toFixed(1) + "%",
      distribution: result.distribution,
    };

    setInfoTraveler((prevInfo) => ({
      ...prevInfo,
      hotels: [...(prevInfo.hotels || []), hotelData], // Add hotelData to hotels array
    }));
  };

  const columns = [
    {
      title: "Loại phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số người/ Phòng",
      dataIndex: "capacity",
      key: "capacity",
      render: (value) => `${value} person${value > 1 ? "s" : ""}/room`,
    },
    {
      title: "Số lượng phòng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Số lượng người",
      dataIndex: "totalCapacity",
      key: "totalCapacity",
      render: (value) => `${value} guests`,
    },
  ];

  return (
    <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Hotel Room Optimizer
      </Title>

      <Form
        form={form}
        onFinish={handleCalculate}
        layout="vertical"
        initialValues={{
          rooms: {
            type1: 0,
            type2: 0,
            type3: 0,
          },
          totalGuests: totalGuests,
        }}
      >
        <Form.Item
          name="totalGuests"
          label="Total Guests"
          rules={[{ required: true, message: "Please enter total guests" }]}
          style={{ marginBottom: 24 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            disabled
          />
        </Form.Item>

        <Title level={4} style={{ marginBottom: 16 }}>
          Select Room Quantities
        </Title>

        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {ROOM_TYPES.map((room) => (
            <Form.Item
              key={room.id}
              name={["rooms", `type${room.id}`]}
              label={`${room.name} (${room.capacity} person${
                room.capacity > 1 ? "s" : ""
              })`}
              style={{ flex: 1 }}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter number of rooms"
              />
            </Form.Item>
          ))}
        </div>

        <Form.Item>
          <div style={{ display: "flex", gap: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              Calculate
            </Button>
            {result && !result.error && (
              <Button type="default" size="large" onClick={handleConfirm}>
                Confirm
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>

      {result && !result.error && (
        <div style={{ marginTop: 24 }}>
          <Card size="small" style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Text strong>Total Guests: {result.totalGuests}</Text>
              <Text strong>Total Rooms: {result.totalRooms}</Text>
              <Text strong>Total Capacity: {result.totalCapacity}</Text>
              <Text strong>
                Utilization:{" "}
                {((result.totalGuests / result.totalCapacity) * 100).toFixed(1)}
                %
              </Text>
            </div>
          </Card>

          <Table
            dataSource={result.distribution}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        </div>
      )}

      {result?.error && (
        <Alert
          message="Error"
          description={result.error}
          type="error"
          showIcon
        />
      )}
    </Card>
  );
};

export default FormCustom;
