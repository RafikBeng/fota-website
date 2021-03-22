import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaceId {

  constructor() { }

    public static RACE_FIND_ME_QUERY_STATE: Number = 0x2C00;
    public static RACE_FIND_ME: Number = 0x2C01;
    public static RACE_GET_POWER_MODE: Number = 0x020C;
    public static RACE_SWITCH_POWER_MODE: Number = 0x020D;

    public static RACE_SPIFLASH_DUAL_DEVICES_PARTITION_ERASE: Number = 0x0413;

    public static RACE_FLASH_SET_PROTECT_BIT: Number = 0x0702;
    public static RACE_FLASH_SECTOR_ERASE: Number = 0x0704;
    public static RACE_FLASH_PAGE_PROGRAM: Number = 0x0707;

    public static RACE_FLASH_DUAL_DEVICES_PARTITION_ERASE: Number = 0x070F;// with INDICATION

    public static RACE_HOSTAUDIO_MMI_GET_ENUM: Number = 0x0901;
    public static RACE_HOSTAUDIO_MMI_SET_ENUM: Number = 0x0900;
    // component (1 byte)
    //    A2DP = 0x00,
    //    line-in = 0x01,
    //    mp3 = 0x02;
    //nvkey ID (2 byte)
    public static RACE_HOSTAUDIO_PEQ_SAVE_STATUS: Number = 0x09FD;

    public static RACE_NVKEY_WRITEFULLKEY: Number = 0x0A01;
    public static RACE_NVKEY_READFULLKEY: Number = 0x0A00;
    public static RACE_NVKEY_RECLAIM: Number = 0x0A03;
    public static RACE_RELOAD_NVKEY_TO_RAM: Number = 0x0A09;

    public static RACE_GET_BATTERY: Number = 0x0C02; // for single
    public static RACE_BLUETOOTH_GET_CLIENT_EXISTENCE: Number = 0x0CD3;
    public static RACE_BLUETOOTH_IS_AGENT_RIGHT_DEVICE: Number = 0x0CD4;      // (id = 3284)
    public static RACE_BLUETOOTH_TWS_GET_BATTERY: Number = 0x0CD6; // for tws // with INDICATION  (id = 3286)
    public static RACE_BLUETOOTH_ROLE_SWITCH: Number = 0x0CD7;

    public static RACE_RELAY_GET_AVA_DST: Number = 0x0D00;
    public static RACE_RELAY_PASS_TO_DST: Number = 0x0D01;

    public static RACE_SUSPEND_DSP: Number = 0x0E01;
    public static RACE_RESUME_DSP: Number = 0x0E02;
    public static DSP_REALTIME_PEQ: Number = 0x0E03;

    public static DSP_REALTIME_ANC_SET_RUNTIME_VOL: Number = 0x0E06;

    public static RACE_ANC_ON: Number = 0x1200;
    public static RACE_ANC_OFF: Number = 0x1201;
    public static RACE_ANC_GET_STATUS: Number = 0x1202;
    public static RACE_ANC_SET_GAIN: Number = 0x1203;
    public static RACE_ANC_READ_PARAM_FROM_NVKEY: Number = 0x1204;
    public static RACE_ANC_WRITE_GAIN_TO_NVKEY: Number = 0x1205;

    public static RACE_FOTA_PARTITION_INFO_QUERY: Number = 0x1C00;
    public static RACE_FOTA_INTEGRITY_CHECK: Number = 0x1C01;
    public static RACE_FOTA_COMMIT: Number = 0x1C02;
    public static RACE_FOTA_STOP: Number = 0x1C03;
    public static RACE_FOTA_QUERY_STATE: Number = 0x1C04;

    public static RACE_SOFTWARE_RESET: Number = 0x1C05;
    public static RACE_FOTA_WRITE_STATE: Number = 0x1C06;
    public static RACE_FOTA_GET_VERSION: Number = 0x1C07;

    public static RACE_FOTA_START: Number = 0x1C08;

    public static RACE_FOTA_START_TRANSCATION: Number = 0x1C0A;

    public static RACE_FOTA_GET_INTERNAL_FLASH_PARTITION_SHA256: Number = 0x1C0F; // => 0x0430

    public static RACE_FOTA_DUAL_DEVICES_START_TRANSACTION: Number = 0x1C10;// with INDICATION
    public static RACE_FOTA_DUAL_DEVICES_COMMIT: Number = 0x1C11;
    public static RACE_FOTA_DUAL_DEVICES_QUERY_STATE: Number = 0x1C12;// with INDICATION
    public static RACE_FOTA_DUAL_DEVICES_WRITE_STATE: Number = 0x1C13;// with INDICATION
    public static RACE_FOTA_DUAL_DEVICES_QUERY_PARTITION_INFO: Number = 0x1C14;// with INDICATION
    public static RACE_FOTA_DUAL_DEVICES_CANCEL: Number = 0x1C15;
    public static RACE_FOTA_GET_PARTITION_ERASE_STATUS: Number = 0x1C16;// with INDICATION

    public static RACE_FOTA_ACTIVE_FOTA_PREPARATION: Number = 0x1C19;

    public static RACE_STORAGE_LOCK_UNLOCK: Number = 0x0430; // dual
    public static RACE_STORAGE_GET_PARTITION_SHA256: Number = 0x0431; // dual, replace: RACE_FOTA_GET_INTERNAL_FLASH_PARTITION_SHA256
    public static RACE_STORAGE_DUAL_DEVICES_PARTITION_ERASE: Number = 0x0432; // dual, replace: RACE_FLASH_DUAL_DEVICES_PARTITION_ERASE
    public static RACE_STORAGE_GET_4K_ERASED_STATUS: Number = 0x0433;// dual, replace: RACE_FOTA_GET_PARTITION_ERASE_STATUS


    public static RACE_STORAGE_READ_MANUFACTURER_AND_MEMORYTYPE: Number = 0x04A0;
    public static RACE_STORAGE_SET_CONFIGURATION_REGISTER: Number = 0x04A1;
    public static RACE_STORAGE_PARTITION_ERASE: Number = 0x0404; // single
    public static RACE_STORAGE_PAGE_PROGRAM: Number = 0x0402; // sigle
    public static RACE_STORAGE_PAGE_READ: Number = 0x0403; // single
    public static RACE_STORAGE_BYTE_PROGRAM: Number = 0x0400; // single
    public static RACE_STORAGE_EMPTY_KE: Number = 0x04F0;

    public static DSP_REALTIME_ANC_ON: Number = 0x0E06;
    public static RACE_AIRDUMP_ONOFF: Number = 0x0E0B;

    public static RACE_ANTENNAUT_REPORT_ENABLE: Number = 0x1700;

    public static RACE_GET_BOOT_REASON: Number = 0x1E00;
    public static RACE_GET_DUMP_ADDR: Number = 0x1E02;
    public static RACE_GET_OFFLINE_DUMP_ADDR: Number = 0x1E06;
    public static RACE_TOOL_ASSERT: Number = 0x1E07;

    public static RACE_MMI_KEY_COMMAND: Number = 0x1101;

}
