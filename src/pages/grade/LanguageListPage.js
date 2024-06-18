import React from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import LanguageButtonComponent from '../../components/grade/LanguageButtonComponent'

const LanguageListPage = () => {
  return (
    <MainLayout>
      <LanguageButtonComponent/>
    </MainLayout>
  )
}

export default LanguageListPage