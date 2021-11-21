import { Button, Checkbox } from "antd";
import React, { useState } from "react";
import { CustomModal } from "./styles";

const TnC = ({ isModalVisible, hideModal,handleTnC }) => {
    const [acceptStatus,setAcceptStatus] =useState(false);
  return (
    <CustomModal
    //   title="Terms And Conditions"
      style={{ top: 100 }}
      visible={isModalVisible}
      onOk={handleTnC}
      onCancel={hideModal}
      width={600}
      footer={[
        <Button key="back" onClick={hideModal}>
              Cancel
            </Button>,
            <Button disabled={!acceptStatus} key="submit" type="primary" onClick={handleTnC}>
              Accept
            </Button>,
      ]}
    >
    <div className="title">Terms and Conditions</div>
    <div className="content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum. not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.more recently with desktop publishing
      software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
    <div className="actions">
      <Checkbox onChange= {e =>setAcceptStatus(e.target.checked)} >I have read the T&C and I agree</Checkbox>
    </div>
    </CustomModal>
  );
};

export default TnC;
