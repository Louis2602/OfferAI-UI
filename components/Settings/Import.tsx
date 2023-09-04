import { IconFileImport } from '@tabler/icons-react';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { SupportedExportFormats } from '@/types/export';

import { SidebarButton } from '../Sidebar/SidebarButton';

import Papa from 'papaparse'

interface Props {
  onImport: (data: SupportedExportFormats) => void;
}

export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');

  const handleFileUpload = (e: any) => {
    if (!e.target.files?.length) return;
    console.log(e.target.files) 
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("🚀 ~ file: Import.tsx:26 ~ handleFileUpload ~ results:", results.data)
        // onImport(results.data);
      }
    })
  }
  return (
    <>
      <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".csv"
        multiple
        onChange={handleFileUpload}
      />

      <SidebarButton
        text={t('Import csv files')}
        icon={<IconFileImport size={18} />}
        onClick={() => {
          const importFile = document.querySelector(
            '#import-file',
          ) as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
        }}
      />
    </>
  );
};
