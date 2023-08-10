export interface DatabaseProps {
    Server?: string,
    Username?: string,
    Password?: string,
    Port?: string,
    EncryptedPassword?: string,
    Database?: string,
}
export interface excludeConditionProps {
    FileNames?: string[],
    FolderNames?: string[],
    FileExtensions?: string[],
    FilePrefixNames?: string[],
    FolderPrefixNames?: string[],
}
export const WebExcludeConditionDefault: excludeConditionProps = {
    FolderNames: ["@BK", "BK", "log", "logfile", "logfiles", "log_bk", "log_old", ".vs", "TempUnZipInfo", "packages", "Temp", "Download", "Session"],
    FileExtensions: [".vspscc", ".bak", ".sln", ".scc", ".pdb", ".bak", ".tmp", ".installlog"],
    FolderPrefixNames: ["logfiles"],
};
export const ServiceExcludeCondition: excludeConditionProps = {
    FolderNames: ["@BK", "BK", "log", "logfile", "logfiles", "log_bk", "log_old", ".vs", "TempUnZipInfo", "packages", "Temp", "Download"],
    FileExtensions: [".vspscc", ".bak", ".sln", ".scc", ".pdb", ".bak", ".tmp", ".installlog"],
    FolderPrefixNames: ["logfiles"],
};
export const BackupExcludeCondition: excludeConditionProps = {
    FolderNames: ["@BK", "BK", "log", "logfile", "logfiles", "log_bk", "log_old", ".vs", "TempUnZipInfo", "packages", "Temp", "Download"],
    FileExtensions: [".vspscc", ".bak", ".sln", ".scc", ".pdb", ".bak", ".tmp", ".installlog"],
    FolderPrefixNames: ["logfiles"],
};
export interface FolderInfoProps {
    FolderPath?: string,
    ExcludeCondition?: excludeConditionProps
}
export interface BackupFilesProps {
    BackupFolderPath?: string
}

export interface ScheduleProps {
    Year?: number,
    Month?: number,
    Day?: number,
    Hour?: number,
    Minute?: number,
    DaysOfWeek?: string[],
    Period?: "Daily" | "Weekly" | "Monthly" | "Yearly" | "Specified" | string,
    Dates?: string[],
    Date?: string,
    TimeZoneOffset?: number
}
export const ScheduleDefault: ScheduleProps = { Year: 0, Month: 0, Day: 0, Hour: 0, Minute: 0, DaysOfWeek: [], Period: "Specified", Date: "", TimeZoneOffset: 0 };
export interface actionProps {
    Name?: string,
    Path?: string,
    ComponentType?: string,
    Type?: "Realtime" | "Schedule" | string,
    Schedule?: ScheduleProps,
    Specs?: (DatabaseProps) | any,
    Status?: string
}