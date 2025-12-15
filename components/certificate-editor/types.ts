export interface CertificateEditorProps {
  templateUrl: string;
  initialConfig?: string;
  onSave: (config: string, preview: string) => Promise<void>;
}

export interface PresetField {
  id: string;
  label: string;
  icon: any;
  defaultText: string;
  fontSize: number;
  fontFamily: string;
  top: number;
  color: string;
}
