from pydantic import BaseModel, Field, validator
import numpy as np

class PatientFeatures(BaseModel):

    # 0–12
    age: float = Field(..., ge=0, le=120)
    num_sexual_partners: float = Field(..., ge=0)
    first_sexual_intercourse: float = Field(..., ge=0)
    num_pregnancies: float = Field(..., ge=0)

    smokes: float = Field(..., ge=0, le=1)
    smokes_years: float = Field(..., ge=0)
    smokes_packs_year: float = Field(..., ge=0)

    hormonal_contraceptives: float = Field(..., ge=0, le=1)
    hormonal_contraceptives_years: float = Field(..., ge=0)

    iud: float = Field(..., ge=0, le=1)
    iud_years: float = Field(..., ge=0)

    stds: float = Field(..., ge=0, le=1)
    stds_number: float = Field(..., ge=0)

    # 13–24 (12 STD subtypes)
    stds_condylomatosis: float = 0
    stds_cervical_condylomatosis: float = 0
    stds_vaginal_condylomatosis: float = 0
    stds_vulvo_perineal_condylomatosis: float = 0
    stds_syphilis: float = 0
    stds_pelvic_inflammatory_disease: float = 0
    stds_genital_herpes: float = 0
    stds_molluscum_contagiosum: float = 0
    stds_aids: float = 0
    stds_hiv: float = 0
    stds_hepatitis_b: float = 0
    stds_hpv: float = 0

    # 25
    stds_number_of_diagnosis: float = 0

    # 26–29
    dx_cancer: float = 0
    dx_cin: float = 0
    dx_hpv: float = 0
    dx: float = 0

    # 30–32
    hinselmann: float = 0
    schiller: float = 0
    citology: float = 0

    @validator("first_sexual_intercourse")
    def check_age(cls, v, values):
        if "age" in values and v > values["age"]:
            raise ValueError("First intercourse age cannot exceed age")
        return v

    def to_array(self):
        arr = np.array([[

            self.age, self.num_sexual_partners, self.first_sexual_intercourse,
            self.num_pregnancies,

            self.smokes, self.smokes_years, self.smokes_packs_year,

            self.hormonal_contraceptives, self.hormonal_contraceptives_years,

            self.iud, self.iud_years,

            self.stds, self.stds_number,

            self.stds_condylomatosis,
            self.stds_cervical_condylomatosis,
            self.stds_vaginal_condylomatosis,
            self.stds_vulvo_perineal_condylomatosis,
            self.stds_syphilis,
            self.stds_pelvic_inflammatory_disease,
            self.stds_genital_herpes,
            self.stds_molluscum_contagiosum,
            self.stds_aids,
            self.stds_hiv,
            self.stds_hepatitis_b,
            self.stds_hpv,

            self.stds_number_of_diagnosis,

            self.dx_cancer, self.dx_cin, self.dx_hpv, self.dx,

            self.hinselmann, self.schiller, self.citology

        ]])

        assert arr.shape[1] == 33, f"Expected 33 features, got {arr.shape[1]}"
        return arr