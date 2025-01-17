import { DatePicker, Form, Input, Select } from "antd";
import React from "react";

const { Option } = Select;

const InfoTour = ({ form }) => {
  const { RangePicker } = DatePicker;

  return (
    <div className="max-w-full mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6">Thông tin chuyến đi</h2>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        initialValues={{
          passengers: {
            adults: 0,
            childrenUnder11: 0,
            childrenUnder5: 0,
          },
        }}
      >
        <Form.Item
          label="Ngày đi - Ngày về"
          name="date"
          rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
        >
          <RangePicker
            placeholder={["Nhập ngày bắt đầu", "Nhập ngày kết thúc"]}
            className="w-full"
          />
        </Form.Item>
        <div>
          <p className="text-start">Số lượng hành khách</p>
          <div className="grid grid-cols-3 gap-5">
            <Form.Item
              label="Người lớn (11 tuổi trở lên)"
              name={["passengers", "adults"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng hợp lệ!",
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error("Vui lòng nhập số lượng!")
                      );
                    }
                    if (isNaN(value) || value <= 0) {
                      return Promise.reject(
                        new Error("Số lượng phải là số dương!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Nhập số lượng"
                type="number"
                step="1"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Trẻ em (dưới 11 tuổi)"
              name={["passengers", "childrenUnder11"]}
            >
              <Input
                placeholder="Nhập số lượng"
                type="number"
                step="1"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Trẻ nhỏ (dưới 5 tuổi)"
              name={["passengers", "childrenUnder5"]}
            >
              <Input
                placeholder="Nhập số lượng"
                type="number"
                step="1"
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default InfoTour;
