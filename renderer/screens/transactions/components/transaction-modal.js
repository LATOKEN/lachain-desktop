import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from "react-i18next";

function TransactionModal({close, transactionDetails}) {
  const {t} = useTranslation()

  useEffect(() => {
    console.log(transactionDetails, 'transactionDetails')
  }, [])
  return (
    <div className="P-transaction-information">
      <button type="button" className="G-close-modal" onClick={close}/>
      <div className="P-transaction-block">
        <h3>{t('Transaction details')}</h3>
        <ul>
          <li>
            <p>{t('Transaction Hash')}:</p>
            <p>{transactionDetails.hash}</p>
          </li>
          <li>
            <p>{t('Status')}:</p>
            <p>{transactionDetails.status}</p>
          </li>
          <li>
            <p>{t('Block')}:</p>
            <p>{transactionDetails.block}</p>
          </li>
          <li>
            <p>{t('From')}:</p>
            <p className="P-color-blue">{transactionDetails.transaction.from}</p>
          </li>
          <li>
            <p>{t('To')}:</p>
            <p className="P-color-blue">{transactionDetails.transaction.to}</p>
          </li>
          <li>
            <p>{t('Value')}:</p>
            <p>{Number(transactionDetails.transaction.value)}</p>
          </li>
          <li>
            <p>{t('Gas Price')}:</p>
            <p>{transactionDetails.transaction.gasPrice}</p>
          </li>
        </ul>
      </div>
      <style jsx>{`
      .P-close{
        width: 15px;
        height:15px
      }
              .G-close-modal {
          width    : 15px;
          height   : 15px;
          position : absolute;
          cursor   : pointer;
          top      : 15px;
          right    : 15px;
          display  : block;
                    background-color: transparent;
                  outline: none;
        
                  border: none;
        
        
        }
          .G-close-modal:before {
            content          : '';
            position         : absolute;
            width            : 100%;
            height           : 2px;
            background-color : black;
            left             : 50%;
            top              : 50%;
            border-radius    : 5px;
            transform        : translate(-50%, -50%) rotate(45deg);
          }
        
          .G-close-modal:after {
            content          : '';
            position         : absolute;
            width            : 100%;
            height           : 2px;
            background-color : black;
            left             : 50%;
            top              : 50%;
            border-radius    : 5px;
            transform        : translate(-50%, -50%) rotate(-45deg);
          }
        }
        .P-transaction-information {
          background-color: white;
          padding: 15px 25px;
          border-radius: 15px;
          min-width: 800px;
          position: relative;
        }
        .P-transaction-block h3{
          font-size: 18px;
          font-weight:600
        }
        .P-transaction-block ul {
          padding: 0;
          margin:0
        }
        .P-transaction-block ul li {
          list-style: none;
          margin:5px 0;
          padding:10px 0;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(0,0,0,0.1)
        }
        .P-transaction-block ul li p{
          margin: 0
        }
        .P-transaction-block ul li p:first-child {
          min-width:150px;
          font-weight:600;
          margin-right: 30px
        }
        .P-color-blue{
          color: blue
        }
      `}</style>
    </div>
  )
}

TransactionModal.propTypes = {
  close: PropTypes.func,
  transactionDetails: PropTypes.object,
}

export default TransactionModal
