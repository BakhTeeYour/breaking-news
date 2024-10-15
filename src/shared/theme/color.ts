export type textColor =
	| 'txtPrimary'
	| 'txtSecondary'
	| 'txtBlack'
	| 'txtDisabled'
	| 'txtSpecial'
	| 'txtCritical'
	| 'txtSuccess'
	| 'txtWarning'
	| 'btnPrimaryDefault'
	| 'btnPrimaryHover'
	| 'btnPrimaryDisabled'
	| 'btnSecondaryDefault'
	| 'btnSecondaryHover'
	| 'btnSecondaryDisabled'
	| 'btnSpecialSuccess'
	| 'btnSpecialDisabled'
	| 'btnSpecialWarning'
	| 'textBlue'

export type LabelColor = 'success' | 'warning' | 'error' | 'default'

export const textColors: Record<textColor, Record<textColor, string> | string> =
	{
		txtPrimary: 'text-primary',
		txtSecondary: 'text-secondary',
		txtBlack: 'text-black',
		txtDisabled: 'text-disable',
		txtSpecial: 'text-special',
		txtCritical: 'text-critical',
		txtSuccess: 'text-success',
		txtWarning: 'text-warning',
		textBlue: 'text-blue',
		btnPrimaryDefault: 'text-buttonPrimary-default',
		btnPrimaryHover: 'text-buttonPrimary-hover',
		btnPrimaryDisabled: 'text-buttonPrimary-disabled',
		btnSecondaryDefault: 'text-buttonSecondary-default',
		btnSecondaryHover: 'text-buttonSecondary-hover',
		btnSecondaryDisabled: 'text-buttonSecondary-disabled',
		btnSpecialSuccess: 'text-buttonSpecial-success',
		btnSpecialDisabled: 'text-buttonSpecial-disabled',
		btnSpecialWarning: 'text-buttonSpecial-warning'
	}
