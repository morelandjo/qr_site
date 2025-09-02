import { useState } from 'react'
import { MantineProvider, Container, Title, TextInput, Button, Stack, Paper, Switch } from '@mantine/core'
import { useForm, Controller } from 'react-hook-form'
import QRCodeLogo from 'react-qrcode-logo'
import '@mantine/core/styles.css'
import mhsLogo from './assets/mhs-logo.png'

interface FormData {
  text: string
  embedLogo: boolean
}

function App() {
  const [qrValue, setQrValue] = useState<string>('')
  const [showLogo, setShowLogo] = useState<boolean>(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      text: '',
      embedLogo: false
    }
  })

  const onSubmit = (data: FormData) => {
    setQrValue(data.text)
    setShowLogo(data.embedLogo)
  }

  return (
    <MantineProvider>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container size="sm">
          <Stack align="center" gap="xl">
            <Title order={1} ta="center">QR Code Generator</Title>
            
            <Paper shadow="md" p="xl" radius="md" w="100%" maw={400}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="md">
                  <TextInput
                    label="Enter text or URL"
                    placeholder="https://example.com or any text"
                    {...register('text', { 
                      required: 'Please enter some text or URL',
                      minLength: { value: 1, message: 'Text cannot be empty' }
                    })}
                    error={errors.text?.message}
                    size="md"
                  />
                  
                  <Controller
                    name="embedLogo"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        label="Embed MHS logo"
                        description="Add MHS logo to the center of QR code"
                        checked={field.value}
                        onChange={field.onChange}
                        size="md"
                      />
                    )}
                  />
                  
                  <Button type="submit" size="md" fullWidth>
                    Generate QR Code
                  </Button>
                </Stack>
              </form>
            </Paper>

            {qrValue && (
              <Paper shadow="md" p="xl" radius="md">
                <Stack align="center" gap="md">
                  <Title order={3} size="h4">Your QR Code:</Title>
                  <QRCodeLogo
                    value={qrValue}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    logoImage={showLogo ? mhsLogo : undefined}
                    logoWidth={40}
                    logoHeight={40}
                    logoOpacity={0.8}
                    removeQrCodeBehindLogo={true}
                    ecLevel="M"
                  />
                  <div style={{ fontSize: '14px', color: '#666', textAlign: 'center', wordBreak: 'break-all' }}>
                    {qrValue.length > 50 ? qrValue.substring(0, 50) + '...' : qrValue}
                  </div>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Container>
      </div>
    </MantineProvider>
  )
}

export default App
