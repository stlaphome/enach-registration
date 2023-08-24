import axios from "axios";
import { useEffect, useRef } from "react";

const EnachConvertForm = (props) => {
  const data = props.data;
  let prefix = "\\x";

  let utilCode = data.utilCode !==""&& prefix+data.utilCode;
  let shortCode =data.shortCode !==""&& prefix+data.shortCode;
  let checkSum = data.checkSum;
  let merchantCategoryCode = data.merchantCategoryCode;
  let msgId = data.msgId;
  let customerAccountName = data.customerAccountName !=="" &&prefix+data.customerAccountName;
  let customerTelephoneNumber = data.customerTelephoneNumber!==""?prefix+data.customerTelephoneNumber:"";
  let customerMaildId = data.customerMaildId!==""&&prefix+data.customerMailId;
  let customerMobileNumber = data.customerMobileNumber!==""&&prefix+data.customerMobileNumber;
 let customerAccountNumber = data.customerAccountNumber!==""&&prefix+data.customerAccountNumber;
 let customerStartDate = data.customerStartDate;
 let customerExpiryDate = data.customerExpiryDate;
 let customerDebitAmount = data.customerDebitAmount;
 let customerMaximumAmount = data.customerMaximumAmount;
 let customerDebitFrequency = data.customerDebitFrequency;
 let customerSeqenceType = data.customerSeqenceType;
 let customerInstructedMemberId = data.customerInstructedMemberId;
 let channel = data.channel;
 let filler5 = data.filler5;


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
        value={utilCode}
      />
      <input
        id="Short_Code"
        name="Short_Code"
        type="hidden"
        //value={"SUNHFL"}
        value={shortCode}
      />
      <input
        id="CheckSum"
        name="CheckSum"
        type="hidden"
        //value="50200003144866|2023-08-15|||5000.00"
        value={checkSum}
      />
      <input
        id="Merchant_Category_Code"
        name="Merchant_Category_Code"
        type="hidden"
        value={merchantCategoryCode}
      />
      <input id="MsgId" name="MsgId" type="hidden" value={msgId} />
      <input
        id="Customer_Name"
        name="Customer_Name"
        type="hidden"
        // value={"mandate checking"}
        value={customerAccountName}
      />
      <input
        id="Customer_TelphoneNo"
        name="Customer_TelphoneNo"
        type="hidden"
        value={customerTelephoneNumber}
      />
      <input
        id="Customer_EmailId"
        name="Customer_EmailId"
        type="hidden"
        //value="sathyac@sundarambnpphome.in"
        value={customerMaildId}
      />
      <input
        id="Customer_Mobile"
        name="Customer_Mobile"
        //value={"8754549314"}
        type="hidden"
        value={customerMobileNumber}
      />
      <input
        id="Customer_AccountNo"
        name="Customer_AccountNo"
        type="hidden"
        // value={"50200003144866"}
        value={customerAccountNumber}
      />
      <input
        id="Customer_StartDate"
        name="Customer_StartDate"
        type="hidden"
        value={customerStartDate}
      />
      <input
        id="Customer_ExpiryDate"
        name="Customer_ExpiryDate"
        type="hidden"
        value={customerExpiryDate}
      />
      <input
        id="Customer_DebitAmount"
        name="Customer_DebitAmount"
        type="hidden"
        value={customerDebitAmount}
      />
      <input
        id="Customer_MaxAmount"
        name="Customer_MaxAmount"
        type="hidden"
        value={customerMaximumAmount}
      />
      <input
        id="Customer_DebitFrequency"
        name="Customer_DebitFrequency"
        type="hidden"
        value={customerDebitFrequency}
      />
      <input
        id="Customer_SequenceType"
        name="Customer_SequenceType"
        type="hidden"
        value={customerSeqenceType}
      />
      <input
        id="Customer_InstructedMemberId"
        name="Customer_InstructedMemberId"
        type="hidden"
        value={customerInstructedMemberId}
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
      <input id="Channel" name="Channel" type="hidden" value={channel} />
      <input id="Filler1" name="Filler1" type="hidden" value="" />
      <input id="Filler2" name="Filler2" type="hidden" value="" />
      <input id="Filler3" name="Filler3" type="hidden" value="" />
      <input id="Filler4" name="Filler4" type="hidden" value="" />
      <input id="Filler5" name="Filler5" type="hidden" value={filler5} />
      <input id="Filler6" name="Filler6" type="hidden" value="" />
      <input id="Filler7" name="Filler7" type="hidden" value="" />
      <input id="Filler8" name="Filler8" type="hidden" value="" />
      <input id="Filler9" name="Filler9" type="hidden" value="" />
      <input id="Filler10" name="Filler10" type="hidden" value="" />
      <input type="submit" ref={submitRef} sx={{visibility:"hidden"}}/>
    </form>
  );
};
export default EnachConvertForm;
