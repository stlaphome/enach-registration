import axios from "axios";
import { useEffect, useRef } from "react";

const EnachConvertForm = (props) => {
  const data = props.data;
  const submitRef = useRef();
  useEffect(() => {
      submitRef.current.click();
  }, []);

  return (
    <form
      id="PostForm"
      name="PostForm"
      action="https://emandateut.hdfcbank.com/Emandate.aspx"
      method="POST"
      
    >
      <input
        id="UtilCode"
        name="UtilCode"
        type="hidden"
        // value={"NACH00000000000382"}
        value={data.utilCodeEncrypted}
      />
      <input
        id="Short_Code"
        name="Short_Code"
        type="hidden"
        //value={"SUNHFL"}
        value={data.shortCodeEncrypted}
      />
      <input
        id="CheckSum"
        name="CheckSum"
        type="hidden"
        //value="50200003144866|2023-08-15|||5000.00"
        value={data.checksumeEncrypted}
      />
      <input
        id="Merchant_Category_Code"
        name="Merchant_Category_Code"
        type="hidden"
        value={data.merchantCategoryCode}
      />
      <input id="MsgId" name="MsgId" type="hidden" value={data.msgId} />
      <input
        id="Customer_Name"
        name="Customer_Name"
        type="hidden"
        // value={"mandate checking"}
        value={data.customerAccountNameEncrypted}
      />
      <input
        id="Customer_TelphoneNo"
        name="Customer_TelphoneNo"
        type="hidden"
        value={data.customerTelephoneNumber}
      />
      <input
        id="Customer_EmailId"
        name="Customer_EmailId"
        type="hidden"
        //value="sathyac@sundarambnpphome.in"
        value={data.customerMaildIdEncrypted}
      />
      <input
        id="Customer_Mobile"
        name="Customer_Mobile"
        //value={"8754549314"}
        type="hidden"
        value={data.customerMobileNumberEncrypted}
      />
      <input
        id="Customer_AccountNo"
        name="Customer_AccountNo"
        type="hidden"
        // value={"50200003144866"}
        value={data.customerAccountNumberEncrypted}
      />
      <input
        id="Customer_StartDate"
        name="Customer_StartDate"
        type="hidden"
        value={data.customerStartDate}
      />
      <input
        id="Customer_ExpiryDate"
        name="Customer_ExpiryDate"
        type="hidden"
        value={data.customerExpiryDate}
      />
      <input
        id="Customer_DebitAmount"
        name="Customer_DebitAmount"
        type="hidden"
        value={data.customerDebitAmount}
      />
      <input
        id="Customer_MaxAmount"
        name="Customer_MaxAmount"
        type="hidden"
        value={data.customerMaximumAmount}
      />
      <input
        id="Customer_DebitFrequency"
        name="Customer_DebitFrequency"
        type="hidden"
        value={data.customerDebitFrequency}
      />
      <input
        id="Customer_SequenceType"
        name="Customer_SequenceType"
        type="hidden"
        value={data.customerSeqenceType}
      />
      <input
        id="Customer_InstructedMemberId"
        name="Customer_InstructedMemberId"
        type="hidden"
        value={data.customerInstructedMemberId}
      />
      <input
        id="Customer_Reference1"
        name="Customer_Reference1"
        type="hidden"
        value=""
      />
      <input
        id="Customer_Reference2"
        name="Customer_Reference2"
        type="hidden"
        value=""
      />
      <input id="Channel" name="Channel" type="hidden" value={data.channel} />
      <input id="Filler1" name="Filler1" type="hidden" value="" />
      <input id="Filler2" name="Filler2" type="hidden" value="" />
      <input id="Filler3" name="Filler3" type="hidden" value="" />
      <input id="Filler4" name="Filler4" type="hidden" value="" />
      <input id="Filler5" name="Filler5" type="hidden" value="S" />
      <input id="Filler6" name="Filler6" type="hidden" value="" />
      <input id="Filler7" name="Filler7" type="hidden" value="" />
      <input id="Filler8" name="Filler8" type="hidden" value="" />
      <input id="Filler9" name="Filler9" type="hidden" value="" />
      <input id="Filler10" name="Filler10" type="hidden" value="" />
      <input type="submit" ref={submitRef} sx={{visibility:"hidden",}}/>
    </form>
  );
};
export default EnachConvertForm;
