---
name: mural-dashboard
description: use when do any update, or creation on any of dashboard components, pages, or actions
---

# Mural Dashboard

* make all forms max width  max-w-7xl.
* dont add icons in form page header e.g ("icon" Add new career => Bad, Add new career => good).
* all input labels should have same font color, wight, and size.
* input register, and error name should be wrote as this: positionEn (camel case) not this: position_en.
* each time you use image uploader make sure to send "en" locale in props.
* when you want to give the fetched data a type (e.g banner by id, or all banners) dont take type from prisma, check the service that i created, takes its data type, add it in types.ts that it is in its folder, then import it when you need it.
* in actions, when you want to check if there is any issue in the service (so you know what to return) check success only, no need for multi check like this: !result.success || (result.status !== 201 && result.status !== 200).
* in actions, sent same status, e.g: status: result.status, not status:200
* for updating form, when you set the defualt values, no need for sending explicit object, send the whole object, e.g:  defaultValues: category.
