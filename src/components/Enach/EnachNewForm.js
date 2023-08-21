import axios from "axios";

const EnachNewForm = (props) => {
  const currentDate = new Date();
  const requestMap = {
    utilCode: "NACH00000000000382",
    utilCodeEncrypted:
      "\x179ea78edac3d16dbad4e77ea34277bc229f22e6765184bdcd0f529d17f748de",
    shortCode: "SUNHFL",
    shortCodeEncrypted: "\xf65d964c998d3740d5b5f30d80e1d04e",
    checksum: { currentDate } + "|2023-08-17|||5000.00",
    checksumeEncrypted:
      "19fd6140b5f043d346406a3c297f7e04d27a83bced6890b2061cf55c81fc82aa",
    merchantCategoryCode: "L001",
    msgId: "L1000111",
    customerAccountNumber: "00020350000114",
    customerAccountNumberEncrypted: "\x4b72beb9bc6be48bd24b6d4f068bbc73",
    customerAccountName: "mandate checking",
    customerAccountNameEncrypted:
      "\xcefe13b748d71c51b177c673d725fa6688f78213697ba2d4407403b3d2481889",
    customerMobileNumber: "8754549314",
    customerMobileNumberEncrypted: "\x5b47db3c73fe1554087f5194a54c4a39",
    customerMailId: "sathyac@sundarambnpphome.in",
    customerMaildIdEncrypted:
      "\x1da5b361bf67bf9f766a5b57d7acc5fcb5730951816f3c3ca565ba1d17952ad2",
    customerStartDate: { currentDate }, //currentDate
    customerExpiryDate: "",
    customerDebitAmount: "",
    customerMaximumAmount: "5000.00",
    customerDebitFrequency: "MNTH",
    customerSeqenceType: "RCUR",
    customerInstructedMemberId: "HDFC0000017",
    channel: "Debit",
    filler5: "S",
  };
  const getSubmitHandler = async () => {
    //const response = await axios.post("/enach/insertRequest", requestMap);
    //console.log(response.data);
  };
  return (
    <form
      id="PostForm"
      name="PostForm"
      onSubmit={getSubmitHandler}
      action="https://emandateut.hdfcbank.com/Emandate.aspx"
      method="POST"
    >
      <input
        type="hidden"
        id="UtilCode"
        name="UtilCode"
        // value={"NACH00000000000382"}
        value="\x179ea78edac3d16dbad4e77ea34277bc229f22e6765184bdcd0f529d17f748de"
      />
      <input
        type="hidden"
        id="Short_Code"
        name="Short_Code"
        //value={"SUNHFL"}
        value="\xf65d964c998d3740d5b5f30d80e1d04e"
      />
      <input
        type="hidden"
        id="CheckSum"
        name="CheckSum"
        //value="50200003144866|2023-08-18|||5000.00"
        
        value="d8875cd75e46ad56ffdaa7c68109892e313aac909779c49ae0955819183be49e"
      />
      <input
        type="hidden"
        id="Merchant_Category_Code"
        name="Merchant_Category_Code"
        value="L001"
      />
      <input type="hidden" id="MsgId" name="MsgId" value="L1000231" />
      <input
        type="hidden"
        id="Customer_Name"
        name="Customer_Name"
        // value={"mandate checking"}
        value="\xcefe13b748d71c51b177c673d725fa6688f78213697ba2d4407403b3d2481889"
      />
      <input
        type="hidden"
        id="Customer_TelphoneNo"
        name="Customer_TelphoneNo"
        value=""
      />
      <input
        type="hidden"
        id="Customer_EmailId"
        name="Customer_EmailId"
        //value="sathyac@sundarambnpphome.in"
        value="\x1da5b361bf67bf9f766a5b57d7acc5fcb5730951816f3c3ca565ba1d17952ad2"
      />
      <input
        type="hidden"
        id="Customer_Mobile"
        name="Customer_Mobile"
        //value={"8754549314"}
        value="\x5b47db3c73fe1554087f5194a54c4a39"
      />
      <input
        type="hidden"
        id="Customer_AccountNo"
        name="Customer_AccountNo"
        // value={"50200003144866"}
        value="\x0b3546d1b656b76a4027e4e5016c3638"
      />
      <input
        type="hidden"
        id="Customer_StartDate"
        name="Customer_StartDate"
        value="2023-08-18"
      />
      <input
        type="hidden"
        id="Customer_ExpiryDate"
        name="Customer_ExpiryDate"
        value=""
      />
      <input
        type="hidden"
        id="Customer_DebitAmount"
        name="Customer_DebitAmount"
        value=""
      />
      <input
        type="hidden"
        id="Customer_MaxAmount"
        name="Customer_MaxAmount"
        value="5000.00"
      />
      <input
        type="hidden"
        id="Customer_DebitFrequency"
        name="Customer_DebitFrequency"
        value="MNTH"
      />
      <input
        type="hidden"
        id="Customer_SequenceType"
        name="Customer_SequenceType"
        value="RCUR"
      />
      <input
        type="hidden"
        id="Customer_InstructedMemberId"
        name="Customer_InstructedMemberId"
        value="HDFC0000017"
      />
      <input
        type="hidden"
        id="Customer_Reference1"
        name="Customer_Reference1"
        value=""
      />
      <input
        type="hidden"
        id="Customer_Reference2"
        name="Customer_Reference2"
        value=""
      />
      <input type="hidden" id="Channel" name="Channel" value="Net" />
      <input type="hidden" id="Filler1" name="Filler1" value="" />
      <input type="hidden" id="Filler2" name="Filler2" value="" />
      <input type="hidden" id="Filler3" name="Filler3" value="" />
      <input type="hidden" id="Filler4" name="Filler4" value="" />
      <input type="hidden" id="Filler5" name="Filler5" value="S" />
      <input type="hidden" id="Filler6" name="Filler6" value="" />
      <input type="hidden" id="Filler7" name="Filler7" value="" />
      <input type="hidden" id="Filler8" name="Filler8" value="" />
      <input type="hidden" id="Filler9" name="Filler9" value="" />
      <input type="hidden" id="Filler10" name="Filler10" value="" />
      <input type="submit" />
    </form>
  );
};
export default EnachNewForm;