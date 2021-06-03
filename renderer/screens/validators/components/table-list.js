import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

function TableList({dataList = []}) {
  const {t} = useTranslation()

  return (
    <div className="table-block">
      <div className="table-header">
        <ul className="table-tr">
          <li title={t('ip')}>{t('ip')}</li>
          <li title={t('connections')}> {t('connections')}</li>
          <li title={t('status')}> {t('status')}</li>
          <li title={t('address')}> {t('address')}</li>
          <li title={t('block')}> {t('block')}</li>
          <li title={t('pool')}> {t('pool')}</li>
          <li title={t('validatorAtMaxHeight')}>
            {' '}
            {t('validatorAtMaxHeight')}
          </li>
        </ul>
      </div>
      <div className="table-body">
        {dataList.map((item, index) => (
          <ul key={index} className="table-tr">
            <li title={item.ip ? item.ip.toString() : 'x'}>{item.ip || '—'}</li>
            <li title={item.connection ? item.connection.toString() : 'x'}>{item.connections || '—'}</li>
            <li title={item.status ? item.status.toString() : 'x'}>{item.status || '—'}</li>
            <li title={item.address ? item.address.toString() : 'x'}>{item.address || '—'}</li>
            <li title={item.block ? item.block.toString() : 'x'}>{item.block || '—'}</li>
            <li title={item.pool ? item.pool.toString() : 'x'}>{item.txes || '—'}</li>
            <li title={item.validatorAtMaxHeight ? item.validatorAtMaxHeight.toString() : 'x'}>
              {item.validatorAtMaxHeight.toString() || '—'}
            </li>
          </ul>
        ))}
      </div>
      <style jsx>{`
        .table-tr {
          display: flex;
          margin: 0;
          padding: 0;
          width: 100%;
        }

        .table-header .table-tr li {
          font-weight: 600;
          padding: 5px 10px;
          background-color: rgba(0, 0, 0, 0.05);
        }
        .table-body .table-tr:nth-child(even) li {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .table-tr li {
          min-width: 170px;
          max-width: 100%;
          width: 100%;
          list-style: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 4px 10px;
        }

        .table-tr li:nth-child(4) {
          min-width: 400px;
        }

        .table-tr li:nth-child(5),
        .table-tr li:nth-child(6),
        .table-tr li:nth-child(2) {
          min-width: 100px;
        }

        .table-block {
          overflow: hidden;
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}

TableList.propTypes = {
  dataList: PropTypes.array,
}

export default TableList
