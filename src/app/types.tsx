export interface FormData {

}

export interface HandleSubmit<T extends FormData> {
  submitForm: (formData: T) => Promise<any>;
}
