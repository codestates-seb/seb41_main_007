import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { FC, useState } from 'react';
import Select from 'Components/Common/Select';
import { banktype } from 'Types/common/product';

export const KakaoNotice: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="bg-gray-100 py-4 px-3 text-sm mt-6">
        <span className="bg-yellow-200 py-2">
          - 현재 결제는 카카오페이만 가능합니다.
        </span>
      </div>
    </>
  );
};

export const VirtualAccount: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="bg-gray-100 py-4 px-3 text-sm mt-6">
        - 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.
      </div>
    </>
  );
};

export const Deposit: FC = (): JSX.Element => {
  const people = {
    id: 1,
    name: 'NH농협',
    avatar:
      'data:image/png;base64,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',

    Bankaccount: '301-5868-4589-95',
    Bankname: '이유정(Farmpi)',
  };

  const [Bankdata, setBankdata] = useState<banktype>(people);

  return (
    <>
      <div className="bg-gray-100 px-4 py-2 mt-6">
        <div className="flex mt-4">
          <div className="mr-6 mt-2">입금은행</div>
          <div className="">
            <div className="select">
              <Select setBankdata={setBankdata} />
            </div>
            <div className="text-sm mt-6 banking__name ">
              <div className="flex">
                <img
                  src={Bankdata.avatar}
                  alt=""
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                &nbsp;{Bankdata.name}&nbsp;/&nbsp;예금주:&nbsp;
                {Bankdata.Bankname}
              </div>
            </div>
            <div className="text-2xl">{Bankdata.Bankaccount}</div>
          </div>
        </div>
        <div className="flex mt-12 mb-4">
          <div className="pr-6 mt-2">입금자명</div>
          <input type="text" className="py-2 w-3/12 rounded-md"></input>
        </div>
      </div>
    </>
  );
};

export const AccountTransfer: FC = (): JSX.Element => {
  const people = {
    id: 1,
    name: 'NH농협',
    avatar:
      'data:image/png;base64,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',

    Bankaccount: '301-5868-4589-95',
    Bankname: '이유정(Farmpi)',
  };

  return (
    <>
      <div className="bg-gray-100 mt-6 py-3 px-3">
        <div className="flex mt-2">
          <div className="mr-6 mt-2 ml-2">예금주명</div>
          <input type="text" className="py-2 w-3/12 rounded-md "></input>
        </div>
        <div className="text-sm mt-5">
          - 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.
        </div>
      </div>
    </>
  );
};

const Payment: FC = (): JSX.Element => {
  const [kakaopay, setKakopay] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<boolean>(false);
  const [creditcard, setCreditCard] = useState<boolean>(false);
  const [virtualAccout, setVirtualAccount] = useState<boolean>(false);
  const [accountTransfer, setAccountTransfer] = useState<boolean>(false);

  const transferFalseKakaopay = () => {
    setKakopay(!kakaopay);
    setDeposit(false);
    setCreditCard(false);
    setVirtualAccount(false);
    setAccountTransfer(false);
  };

  const transferFalseDeposit = () => {
    setKakopay(false);
    setDeposit(!deposit);
    setCreditCard(false);
    setVirtualAccount(false);
    setAccountTransfer(false);
  };

  const transferFalseCredit = () => {
    setKakopay(false);
    setDeposit(false);
    setCreditCard(!creditcard);
    setVirtualAccount(false);
    setAccountTransfer(false);
  };

  const transferFalseVirtual = () => {
    setKakopay(false);
    setDeposit(false);
    setCreditCard(false);
    setVirtualAccount(!virtualAccout);
    setAccountTransfer(false);
  };
  const transferFalseAcoount = () => {
    setKakopay(false);
    setDeposit(false);
    setCreditCard(false);
    setVirtualAccount(false);
    setAccountTransfer(!accountTransfer);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="kakao mailbox folders">
        <List onClick={transferFalseKakaopay}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <div className="bg-yellow-300 px-1 rounded-lg mr-4">
                  kakaopay
                </div>
              </ListItemIcon>
              <ListItemText primary="카카오페이" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="main mailbox folders">
        <List onClick={transferFalseDeposit}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="ml-6 mr-3">
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="무통장입금" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List onClick={transferFalseCredit}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="ml-6 mr-3">
                <AddCardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="신용카드" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="third mailbox folders">
        <List onClick={transferFalseVirtual}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="ml-6 mr-3">
                <SmartphoneOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="가상계좌" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="fourth mailbox folders">
        <List onClick={transferFalseAcoount}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="ml-6 mr-3">
                <AttachMoneyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="계좌이체" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      {kakaopay && <KakaoNotice />}
      {deposit && <Deposit />}
      {creditcard && <VirtualAccount />}
      {virtualAccout && <VirtualAccount />}
      {accountTransfer && <AccountTransfer />}
    </Box>
  );
};
export default Payment;
