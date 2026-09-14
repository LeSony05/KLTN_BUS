// admin/src/modules/settings/models/settings.model.ts

export interface AdminBankConfig {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch: string;
}

export interface AdminSettingsPayload {
  bank1: AdminBankConfig;
  bank2: AdminBankConfig;
}
